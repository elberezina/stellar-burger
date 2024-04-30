import store, { rootReducer } from '../services/store';

describe('Тестирование rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
