import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Button from './Button'; //COMPONENT
import GoBackArrow from './GoBackArrow'; //COMPONENT

import styles from './pages.module.css'
import csvFunctions from './Utilities/arrayToCSV';
import { fetchOfferDetails, fetchOfferProducts } from './Utilities/Fetching/fetchOffers';

function OfferDetails() {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [products, setProducts] = useState(null);

    const offerDetails = fetchOfferDetails(setOffer, id);
    const offerProducts = fetchOfferProducts(setProducts, id);

    if (!offer) {
        return <div>Loading...</div>;
    }

    if (!products) {
      return <div>Loading...</div>;
  }
    const secondArrayMap = products.reduce((map, obj) => {
      map[obj.sku] = obj;
      return map;
  }, {});

  // Create the final array by combining data from both arrays
  const finalProductsArray = offer.products.map(item => {
      const additionalInfo = secondArrayMap[item.sku];
      return {
        sku: item.sku,
        name: additionalInfo ? additionalInfo.name : '', // If additionalInfo exists, get the name, otherwise use an empty string
        price: additionalInfo ? additionalInfo.price : '', // If additionalInfo exists, get the price, otherwise use an empty string
        priceReduced: item.price,
        brand: additionalInfo ? additionalInfo.brand : '', // If additionalInfo exists
      };
  });

  return (
    <>
    <div className={styles['container-title']}>
      <h1>{offer.name}</h1>
      <GoBackArrow text="Back to Offers" backTo="offers"/>
    </div>

    <table className={styles['items-table']}>
      <tbody>
        <tr>
          <th>Start</th>
          <td>{new Date(offer.start_date).toLocaleDateString()}</td>
        </tr>
        <tr>
          <th>End</th>
          <td>{new Date(offer.end_date).toLocaleDateString()}</td>
        </tr>
        <tr>
          <th>Products</th>
          <td>{offer.products.length}</td>
        </tr>
      </tbody>
    </table>

    <div className={styles['container-title']}>
      <h1>Sales</h1>
      <Button text="CSV"
              action = {() => {
                const csvContent = csvFunctions.convertArrayOfObjectsToCSV(finalProductsArray);
                csvFunctions.downloadCSV(csvContent, `${offer.name}.csv`)}} />
    </div>

    <table className={styles['items-table']}>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Price reduced</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody>
        {finalProductsArray.map(product => (
          <tr key={product.sku}>
            <td>
            <Link className="link" to={`/products/${product.sku}`}>{product.sku}</Link>
            </td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.priceReduced}</td>
            <td>{product.brand}</td>
          </tr>
        ))}
      </tbody>
    </table> 
    </>
  );
}

export default OfferDetails;