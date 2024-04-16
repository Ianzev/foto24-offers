import React, { useState, useEffect } from 'react';
import { ArrowLeftToLine  } from "lucide-react"; // Assuming you're using Lucide icons
import { useParams, Link } from 'react-router-dom';

function OfferDetails() {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/offers/${id}`)
        .then(response => response.json())
        .then(data => {
            setOffer(data);
        })
        .catch(error => {
            console.error('Error fetching offer details:', error);
        });
    }, [id]);

    if (!offer) {
        return <div>Loading...</div>;
    }

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
          
        </nav>
      </aside>
    </div>

    
  );
}

export default OfferDetails;