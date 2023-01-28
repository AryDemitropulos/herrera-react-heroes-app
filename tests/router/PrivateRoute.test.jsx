import { render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas sobre <PrivateRoute.jsx/>', () => {
  test('debe de mostrar el children si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: { id: 'testID', name: 'testName' },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Private Routes</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const children = screen.getByText('Private Routes');
    expect(children).toBeTruthy();
  });

  test('debe de navegar al login si no está autenticado', () => {
    const contextValue = {
      logged: false,
      user: {},
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route
              path='/home'
              element={
                <PrivateRoute>
                  <h1>Private Routes</h1>
                </PrivateRoute>
              }
            />
            <Route path='/login' element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    screen.debug();
    expect(screen.getByText('Login Page')).toBeTruthy();
  });

  test('debe de llamar el localStorage', () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: false,
      user: {},
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route
              path='/home'
              element={
                <PrivateRoute>
                  <h1>Private Routes</h1>
                </PrivateRoute>
              }
            />
            <Route path='/login' element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(localStorage.setItem).toBeCalledWith("lastPath","/home");
  });
});
