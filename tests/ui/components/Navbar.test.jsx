import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui/components/Navbar';

import { MemoryRouter, useNavigate } from 'react-router';

const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedNavigate,
}));

describe('Pruebas sobre el <Navbar/>', () => {
  const contextValue = {
    logged: true,
    user: { name: 'testName', id: 'testID' },
  };

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el nombre de las categorias', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel')).toBeTruthy();
    expect(screen.getByText('DC')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
  });
  test('debe de mostrar el nombre del usuario si este está autenticado', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    expect(screen.getByRole('button').textContent).toBe('Logout');
  });
  test('debe de llamar al logout y al navigate al apretar el boton de logout', () => {
    //const navigate = renderHook(() => useNavigate());
    const logout = jest.fn();
    render(
      <AuthContext.Provider value={{ contextValue, logout }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const buttonLogout = screen.getByText('Logout');
    fireEvent.click(buttonLogout);

    expect(logout).toHaveBeenCalled();

    expect(mockedNavigate).toHaveBeenCalledWith('/login', {
      replace: true,
    });
  });
});
