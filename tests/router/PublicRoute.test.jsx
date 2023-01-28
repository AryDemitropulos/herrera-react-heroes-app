import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas sobre PublicRoute', () => {
  test('debe de mostrar el children si no está autenticado', () => {
    const contextValue = { logged: false };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Publics Routes</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    const children = screen.getByText('Publics Routes');
    expect(children).toBeTruthy();
  });

  test('debe de navegar al home si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: { name: 'testName', id: 'testID' },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <h1>Publics Routes</h1>
                </PublicRoute>
              }
            />
            <Route path='/' element={<h1>Home Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Home Page')).toBeTruthy();
  });
});
