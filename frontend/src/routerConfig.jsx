import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductsTable from './pages/Products.jsx';
import ProductDetails from './pages/ProductPage.jsx';
import Offers from './pages/Offers.jsx';
import OfferDetails from './pages/OfferPage.jsx';
import LoginContainer from './pages/Login/LoginContainer.jsx';
import Layout from './components/Layout.jsx';

// Wrapper component to conditionally render Layout
const RouteWrapper = ({ element }) => {
  // Get the current route path
  const currentPath = window.location.pathname;

  // Check if current route is login or register
  const isLoginOrRegister = currentPath === '/login' || currentPath === '/register';

  // Render with Layout if not login or register
  return isLoginOrRegister ? element : <Layout>{element}</Layout>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteWrapper element={<HomePage />} />
  },
  {
    path: '/products',
    element: <RouteWrapper element={<ProductsTable />} />
  },
  {
    path: '/products/:sku',
    element: <RouteWrapper element={<ProductDetails />} />
  },
  {
    path: '/offers',
    element: <RouteWrapper element={<Offers />} />
  },
  {
    path: '/offers/:id',
    element: <RouteWrapper element={<OfferDetails />} />
  },
  {
    path: '/login',
    element: <LoginContainer isLoginForm={true} isActiveProp={false} />
  },
  {
    path: '/register',
    element: <LoginContainer isLoginForm={false} isActiveProp={true} />
  }
]);

export default router;
