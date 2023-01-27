import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const onLogin = () => {
    login("TEST");
    navigate('/', { replace: true });
  };

  return (
    <div className='container mt-5'>
      <h1>LoginPage</h1>
      <hr />
      <button onClick={onLogin} className='btn btn-primary'>
        Login
      </button>
    </div>
  );
};
