import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import Button from "../components/ui/Button"; //COMPONENT
import GoBackArrow from "../components/ui/GoBackArrow"; //COMPONENT

import styles from "./styles/pages.module.css";
import csvFunctions from "../utils/arrayToCSV";
import {
  fetchOfferDetails,
  fetchOfferProducts,
} from "../utils/fetching/fetchOffers";
import Header from "../components/ui/Header";

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
  const finalProductsArray = offer.products.map((item) => {
    const additionalInfo = secondArrayMap[item.sku];
    return {
      sku: item.sku,
      name: additionalInfo ? additionalInfo.name : "", // If additionalInfo exists, get the name, otherwise use an empty string
      price: additionalInfo ? additionalInfo.price : "", // If additionalInfo exists, get the price, otherwise use an empty string
      priceReduced: item.price,
      brand: additionalInfo ? additionalInfo.brand : "", // If additionalInfo exists
    };
  });

  return (
    <>
      <Header text={offer.name}>
        <GoBackArrow text="Back to Offers" backTo="offers" />
      </Header>

      <table className={styles["items-table"]}>
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

      <Header text="Sales">
        <Button
          text="CSV"
          action={() => {
            const csvContent =
              csvFunctions.convertArrayOfObjectsToCSV(finalProductsArray);
            csvFunctions.downloadCSV(csvContent, `${offer.name}.csv`);
          }}
        />
      </Header>

      <table className={styles["items-table"]}>
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
          {finalProductsArray.map((product) => (
            <tr key={product.sku}>
              <td>
                <Link className="link" to={`/products/${product.sku}`}>
                  {product.sku}
                </Link>
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
