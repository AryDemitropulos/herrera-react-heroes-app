import { useReducer } from 'react';
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

const initialState = {
  logged: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (name) => {
    dispatch({
      type: types.login,
      action: {
        payload: name,
      },
    });
  };

  const logout = () => {
    dispatch({
      type: types.logout,
    });
  };

  const value = { state, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
