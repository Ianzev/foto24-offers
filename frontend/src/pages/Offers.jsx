import React, { useState, useEffect } from 'react';

function Offers() {
  const [offers, setOffer] = useState([]);

  useEffect(() => {
    // Fetch offers from backend server
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
    <div>
      <h1>Offers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(offer => (
            <tr key={offer.id}>
              <td>{offer.name}</td>
              <td>{offer.start_date}</td>
              <td>{offer.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Offers;