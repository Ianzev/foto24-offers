import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import GoBackArrow from './GoBackArrow'; //COMPONENT

import { ArrowBigRight } from "lucide-react"
import styles from '../assets/styles/pages.module.css'
import { fetchProductDetails } from './Utilities/fetching/fetchProducts';

function ProductDetails() {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);

  const productDetails = fetchProductDetails(setProduct, sku);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className={styles['container-title']}>
      <h1>{product.name}</h1>
      <GoBackArrow text="Back to Products" backTo="products"/>
    </div>

    <table className={styles['items-table']}>
      <tbody>
        <tr>
          <th>ID</th>
          <td>{product.idnext}</td>
        </tr> 
        <tr>
          <th>Brand</th>
          <td>{product.brand}</td>
        </tr>
        <tr>
          <th>SKU</th>
          <td>{product.sku}</td>
        </tr>
        <tr>
          <th>EAN</th>
          <td>{product.ean}</td>
        </tr>
        <tr>
          <th>Stock Malaga</th>
          <td>{product.stockmalaga}</td>
        </tr>
        <tr>
          <th>Stock Qmedia</th>
          <td>{product.stockqmedia}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>{product.price}</td>
        </tr>
        <tr>
          <th>Foto24</th>
          <td><a className="link" href={product.urlfoto24}>{<ArrowBigRight size={20}/>}</a></td>
        </tr>
        <tr>
          <th>Photo24</th>
          <td><a className="link" href={product.urlphoto24}>{<ArrowBigRight size={20}/>}</a></td>
        </tr>
      </tbody>
    </table>

    <div className={styles['container-title']}>
      <h1>Sales</h1>
    </div>

    <table className={styles['items-table']}>
      <thead>
        <tr>
          <th>Sales 1</th>
          <th>Sales 10</th>
          <th>Sales 30</th>
          <th>Sales 90</th>
          <th>Sales 180</th>
          <th>Sales 365</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{product.sales1}</td>
          <td>{product.sales10}</td>
          <td>{product.sales30}</td>
          <td>{product.sales90}</td>
          <td>{product.sales180}</td>
          <td>{product.sales365}</td>
        </tr>
      </tbody>
    </table>   
    </>
  );
}

export default ProductDetails;
