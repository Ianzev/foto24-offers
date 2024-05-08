import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import GoBackArrow from './GoBackArrow'; //COMPONENT

import styles from '../assets/styles/pages.module.css'
import { fetchAllOffers } from './Utilities/fetching/fetchOffers';

function Offers() {
  const [offers, setOffers] = useState([]);

  const allOffers = fetchAllOffers(setOffers);

  return (
    <>
    <div className={styles['container-title']}>
      <h1>Offers</h1>
      <GoBackArrow text="Home Page"backTo=""/>
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