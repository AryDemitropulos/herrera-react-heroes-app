import { authReducer, types } from '../../../src/auth';

describe('Pruebas sobre authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const state = authReducer({ logged: false }, {});

    expect(state).toEqual({ logged: false });
  });

  test('debe de (login) llamar el login autenticar y establecer el user', () => {
    const action = {
      type: types.login,
      payload: {
        id: 'TEST',
        name: 'TEST_NAME',
      },
    };

    const newState = authReducer({ logged: false }, action);

    expect(newState).toEqual({ logged: true, user: action.payload });
  });

  test('debe de (logout) borrar el name del usuario y logged false', () => {
    const state = { logged: true, user: { id: 'testID', name: 'testName' } };
    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);

    expect(newState).toEqual({ logged: false, user: {} });
  });
});
