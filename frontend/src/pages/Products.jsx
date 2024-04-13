import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend server
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Foto24</th>
            <th>Photo24</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.sku}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.urlfoto24}</td>
              <td>{product.urlphoto24}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;