import { types } from '../../../src/auth';

describe('Pruebas sobre types de authReducer', () => {
  test('debe de regresar estos types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});

//TODO: JEST: Pruebas sobre Types de reducer: Sencilla prueba que sirve para determinar que no haya cambios no controlados en los types de un Reducer. Si se agrega un nuevo type, tengo que agregarlo en el test
