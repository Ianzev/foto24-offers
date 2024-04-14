import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductsTable from './pages/Products.jsx';
import ProductDetails from './pages/ProductPage.jsx';
import Offers from './pages/Offers.jsx';
import Sidebar from './components/Sidebar.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    element: <Sidebar />,
  },
  {
    path: '/products',
    element: <ProductsTable />,
  },
  {
    path: '/products/:sku',
    element: <ProductDetails />,
  },
  {
    path: '/offers',
    element: <Offers/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
