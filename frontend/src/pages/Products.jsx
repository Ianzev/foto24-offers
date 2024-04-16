import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
    <div className="flex">
      <aside className="h-screen flex flex-col bg-white border-r shadow-sm">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Products</h1>
          </div>

          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Foto24</th>
                <th className="px-4 py-2">Photo24</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.sku} className="hover:bg-indigo-50 text-gray-600">
                  <td className="border px-4 py-2">
                    <Link to={`/products/${product.sku}`}>{product.sku}</Link>
                  </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.urlfoto24}</td>
                  <td className="border px-4 py-2">{product.urlphoto24}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </nav>
      </aside>
    </div>
  );
}

export default ProductsTable;
