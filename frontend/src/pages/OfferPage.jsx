import React, { useState, useEffect } from 'react';
import { ArrowLeftToLine  } from "lucide-react"; // Assuming you're using Lucide icons
import { useParams, Link } from 'react-router-dom';
import styles from './pages.module.css'

function OfferDetails() {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/offers/${id}`)
        .then(response => response.json())
        .then(data => {
            setOffer(data);
        })
        fetch(`http://localhost:3001/products`)
        .then(response => response.json())
        .then(productsData => {
            setProducts(productsData);
        })
        .catch(error => {
            console.error('Error fetching offer details:', error);
        });
    }, [id]);

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
          priceReduced: item.price,
          name: additionalInfo ? additionalInfo.name : '', // If additionalInfo exists, get the name, otherwise use an empty string
          price: additionalInfo ? additionalInfo.price : '' // If additionalInfo exists, get the price, otherwise use an empty string
      };
  });
  
  return (
    <>
    <div className={styles['container-title']}>
      <h1>{offer.name}</h1>
      <Link className="link" to="/offers">
        <ArrowLeftToLine className="mr-2" size={20} />  
        <h2>Back to Offers</h2>
      </Link>
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
      <h1>Products</h1>
    </div>
    <table className={styles['items-table']}>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Price reduced</th>
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
          </tr>
        ))}
      </tbody>
    </table> 
    </>
  );
}

export default OfferDetails;