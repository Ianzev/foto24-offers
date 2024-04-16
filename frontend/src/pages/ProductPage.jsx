import React, { useState, useEffect } from 'react';
import { ArrowLeftToLine  } from "lucide-react"; // Assuming you're using Lucide icons
import { useParams, Link } from 'react-router-dom';

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
    <div className="flex">
      <aside className="h-screen flex flex-col bg-white shadow-sm">
        <nav className="h-full flex flex-col bg-white shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{product.name}</h1>
          </div>

          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-bold px-4 py-2">SKU:</td>
                <td className="border px-4 py-2">{product.sku}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Price:</td>
                <td className="border px-4 py-2">{product.price}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Foto24:</td>
                <td className="border px-4 py-2">{product.urlfoto24}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Photo24:</td>
                <td className="border px-4 py-2">{product.urlphoto24}</td>
              </tr>
            </tbody>
          </table>

          <div className="p-4">
            <Link to="/products" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <span className="mr-2">Back to Products</span>
              <ArrowLeftToLine  size={20} />
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default ProductDetails;
