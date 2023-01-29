import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedNavigate,
}));

describe('Prubas sobre <SearchPage/>', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrarse por con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('debe de mostrar a batman y el input con valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toBe('http://localhost/heroes/dc-batman.jpg');
  });

  test('debe de mostrar alert "Search a Hero" si no buscó ningun heroe', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );
    const defaulAlert = screen.getByLabelText('alert-default');
    const dangerAlert = screen.queryByLabelText('alert-danger');
    expect(dangerAlert).toBeNull();

    expect(defaulAlert).toBeTruthy();
  });

  test('debe de llamar al navigate a la pantalla nueva', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );
    const form = screen.getByLabelText('form');
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'testSearch' } });
    fireEvent.submit(form);

    expect(mockedNavigate).toHaveBeenCalledWith('?q=testSearch');
  });
});
