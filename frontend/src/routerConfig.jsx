import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductsTable from './pages/Products.jsx';
import ProductDetails from './pages/ProductPage.jsx';
import Offers from './pages/Offers.jsx';
import OfferDetails from './pages/OfferPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },

  {
    path: '/products',
    element: <ProductsTable />
  },

  {
    path: '/products/:sku',
    element: <ProductDetails />,
  },

  {
    path: '/offers',
    element: <Offers />,
  },

  {
    path: '/offers/:id',
    element: <OfferDetails />,
  }
]);

export default router;
