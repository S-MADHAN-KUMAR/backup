import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const ProductedRouteAdmin = ({ children, isProtectedForAdminLoggedIn = false }) => {
  const { currentAdmin } = useSelector((state) => state.admin);

  if (isProtectedForAdminLoggedIn) {
    if (currentAdmin?.email) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  } else {

    if (!currentAdmin?.email) {
      return <Navigate to="/admin/login" replace />;
    }
  }


  return children;
};

export default ProductedRouteAdmin;
