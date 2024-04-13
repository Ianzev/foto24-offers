import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${sku}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [sku]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>SKU: {product.sku}</p>
      <p>Price: {product.price}</p>
      <p>Foto24: {product.urlfoto24}</p>
      <p>Photo24: {product.urlphoto24}</p>
    </div>
  );
}

export default ProductDetails;