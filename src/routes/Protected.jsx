import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
  const session = localStorage.getItem('session');

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default Protected;
