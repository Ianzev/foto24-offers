import React, { useState, useEffect } from 'react';
import { ArrowLeftToLine  } from "lucide-react"; // Assuming you're using Lucide icons
import { useParams, Link } from 'react-router-dom';

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
    <div className="flex">
      <aside className="h-screen flex flex-col bg-white shadow-sm">
        <nav className="h-full flex flex-col bg-white shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{offer.name}</h1>
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-bold px-4 py-2">Start</td>
                <td className="border px-4 py-2">{new Date(offer.start_date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">End</td>
                <td className="border px-4 py-2">{new Date(offer.end_date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="font-bold px-4 py-2">Products</td>
                <td className="border px-4 py-2">{offer.products.length}</td>
              </tr>
            </tbody>
          </table>

          <div className="p-4">
            <Link to="/offers" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <span className="mr-2">Back to Offers</span>
              <ArrowLeftToLine  size={20} />
            </Link>
          </div>

          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Products</h1>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Price reduced</th>
              </tr>
            </thead>
            <tbody>
              {finalProductsArray.map(product => (
                <tr key={product.sku} className="hover:bg-indigo-50 text-gray-600">
                  <td className="border px-4 py-2">
                  <Link to={`/products/${product.sku}`}>{product.sku}</Link>
                    </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.priceReduced}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </nav>
      </aside>
    </div>

    
  );
}

export default OfferDetails;