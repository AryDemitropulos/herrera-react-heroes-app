import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router';

describe('Pruebas en <AppRouter/>', () => {
  test('debe de mostrar el login si no está autenticado', () => {
    const contextValue = { logged: false };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Login')).toBeTruthy();
  });
  test('debe de mostrar el componente de Marvel si está autenticado', () => {
    const contextValue = { logged: true };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('MarvelPage')).toBeTruthy();
  });
});
