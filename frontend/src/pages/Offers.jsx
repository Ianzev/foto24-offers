import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './pages.module.css'

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
    <>
          <div className={styles['container-title']}>
            <h1 className="text-2xl font-bold">Offers</h1>
          </div>

          <table className={styles['items-table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(offer => (
                <tr key={offer.id}>
                  <td><Link className="link" to={`/offers/${offer.id}`}>{offer.id}</Link></td>
                  <td>{offer.name}</td>
                  <td>{new Date(offer.start_date).toLocaleDateString()}</td>
                  <td>{new Date(offer.end_date).toLocaleDateString()}</td>
                  <td>{offer.products.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
  );
}

export default Offers;