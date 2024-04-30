import {
  initialState,
  loginUser,
  logout,
  registerUser, setIsAuthChecked,
  setUser,
  updateUser,
  userSlice
} from './userSlice';

describe('Тестирование userSlice', () => {
  const actions = {
    registerUser: {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'username', email: 'email@email.ru' } }
      }
    },
    loginUser: {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'username', email: 'email@email.ru' } }
      }
    },
    logout: {
      pending: {
        type: logout.pending.type,
        payload: null
      },
      rejected: {
        type: logout.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: logout.fulfilled.type,
        payload: null
      }
    },
    update: {
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'new-username', email: 'new-email@email.ru' } }
      }
    }
  };
  describe('Тестируем регистрацию пользователя (registerUser)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.registerUser.pending
      );
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    test('Тестируем состояние ошибки (rejected)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.registerUser.rejected
      );
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe(actions.registerUser.rejected.error.message);
    });
    test('Тестируем состояние успеха (fulfilled)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.registerUser.fulfilled
      );
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.error).toBe(undefined);
      expect(newState.user).toBe(actions.registerUser.fulfilled.payload.user);
    });
  });
  describe('Тестируем авторизацию пользователя (loginUser)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.loginUser.pending
      );
      expect(newState.isAuthChecked).toBe(true);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.loginUser.rejected
      );
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe(actions.loginUser.rejected.error.message);
    });
    test('Тестируем состояние успеха (fulfilled)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.loginUser.fulfilled
      );
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.error).toBe(undefined);
      expect(newState.user).toBe(actions.loginUser.fulfilled.payload.user);
    });
  });
  describe('Тестируем выход пользователя (logout)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = userSlice.reducer(initialState, actions.logout.pending);
      expect(newState.error).toBe(undefined);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.logout.rejected
      );
      expect(newState.error).toBe(actions.logout.rejected.error.message);
    });
    test('Тестируем состояние успеха (fulfilled)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.logout.fulfilled
      );
      expect(newState.error).toBe(undefined);
      expect(newState.user).toBe(actions.logout.fulfilled.payload);
    });
  });
  describe('Тестируем обновление данных пользователя (updateUser)', () => {
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = userSlice.reducer(initialState, actions.update.rejected);
      expect(newState.error).toBe(actions.update.rejected.error.message);
    });
    test('Тестируем состояние ожидания (fulfilled)', () => {
      const newState = userSlice.reducer(
        initialState,
        actions.update.fulfilled
      );
      expect(newState.user).toBe(actions.update.fulfilled.payload.user);
    });
  });
  describe('Тестируем редьюсер setUser', () => {
    test('Проверяем что пользователь обновился', () => {
      const newUser = { name: 'new-username', email: 'new-email@email.ru' };
      const newState = userSlice.reducer(initialState, setUser(newUser));
      expect(newState.user).toBe(newUser);
    });
  });
  describe('Тестируем редьюсер setIsAuthChecked', () => {
    test('Проверяем что значение установилось', () => {
      const expectedIsAuthChecked = true;
      const newState = userSlice.reducer(
        initialState,
        setIsAuthChecked(expectedIsAuthChecked)
      );
      expect(newState.isAuthChecked).toBe(expectedIsAuthChecked);
    });
  });
});
