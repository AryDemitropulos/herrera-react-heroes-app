import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../auth';

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();
  const lastPath = pathname + search;
  
  localStorage.setItem('lastPath', lastPath);

  console.log('Rnder');
  return logged ? children : <Navigate to='/login' />;
};
