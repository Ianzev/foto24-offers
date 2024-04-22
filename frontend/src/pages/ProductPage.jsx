import React, { useState, useEffect } from 'react';
import { ArrowLeftToLine  } from "lucide-react"; // Assuming you're using Lucide icons
import { useParams, Link } from 'react-router-dom';
import { ArrowBigRight } from "lucide-react"
import { Table } from 'react-bootstrap';

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
    <>
        <div className="flex justify-between items-center bg-white w-full p-4 mb-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <Link to="/products" className="flex items-center text-indigo-600 hover:text-indigo-800 link">
              <span className="font-bold mr-2">Back to Products</span>
              <ArrowLeftToLine  size={20} />
            </Link>
        </div>

          <Table striped bordered hover>
            <tbody> 
              <tr>
                <td className="font-bold px-4 py-2">Brand</td>
                <td className="px-4 py-2">{product.brand}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">SKU</td>
                <td className="px-4 py-2">{product.sku}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">EAN</td>
                <td className="px-4 py-2">{product.ean}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Stock Malaga</td>
                <td className="px-4 py-2">{product.stockmalaga}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Stock Qmedia</td>
                <td className="px-4 py-2">{product.stockqmedia}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Price</td>
                <td className="px-4 py-2">{product.price}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Foto24</td>
                <td className="px-4 py-2"><a className="link" href={product.urlfoto24}>{<ArrowBigRight size={20}/>}</a></td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Photo24</td>
                <td className="px-4 py-2"><a className="link" href={product.urlphoto24}>{<ArrowBigRight size={20}/>}</a></td>
              </tr>
            </tbody>
          </Table>
          
          <div className="p-4 pb-2 flex justify-between items-center bg-white">
            <h1 className="text-2xl font-bold">Sales</h1>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='px-4 py-2'>Sales 1</th>
                <th className='px-4 py-2'>Sales 10</th>
                <th className='px-4 py-2'>Sales 30</th>
                <th className='px-4 py-2'>Sales 90</th>
                <th className='px-4 py-2'>Sales 180</th>
                <th className='px-4 py-2'>Sales 365</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className='px-4 py-2'>{product.sales1}</td>
                  <td className='px-4 py-2'>{product.sales10}</td>
                  <td className='px-4 py-2'>{product.sales30}</td>
                  <td className='px-4 py-2'>{product.sales90}</td>
                  <td className='px-4 py-2'>{product.sales180}</td>
                  <td className='px-4 py-2'>{product.sales365}</td>
                </tr>
            </tbody>
          </Table>   
      </>
  );
}

export default ProductDetails;
