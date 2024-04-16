import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Offers() {
  const [offers, setOffer] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/offers')
      .then(response => response.json())
      .then(data => {
        setOffer(data);
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  return (
    <div className="flex">
      <aside className="h-screen flex flex-col bg-white shadow-sm">
        <nav className="h-full flex flex-col bg-white shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Offers</h1>
          </div>

          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Start</th>
                <th className="px-4 py-2">End</th>
                <th className="px-4 py-2">Products</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(offer => (
                <tr key={offer.id} className="hover:bg-indigo-50 text-gray-600">
                  <td className="border px-4 py-2">
                    <Link to={`/offers/${offer.id}`}>{offer.id}</Link>
                  </td>
                  <td className="border px-4 py-2">{offer.name}</td>
                  <td className="border px-4 py-2">{new Date(offer.start_date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{new Date(offer.end_date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{offer.products.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </nav>
      </aside>
    </div>
  );
}

export default Offers;