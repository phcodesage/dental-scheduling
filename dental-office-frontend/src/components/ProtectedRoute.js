import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if a token is present

  return token ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
