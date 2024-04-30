import { getIngredients, ingredientsSlice, initialState } from './burgerSlice';

describe('Тестирование burgerSlice', () => {
  const actions = {
    getIngredients: {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['ingredient 1', 'ingredient 2']
      }
    }
  };
  describe('Тестируем получение ингридиентов (getFeeds)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = ingredientsSlice.reducer(
        initialState,
        actions.getIngredients.pending
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = ingredientsSlice.reducer(
        initialState,
        actions.getIngredients.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(
        actions.getIngredients.rejected.error.message
      );
    });
    test('Тестируем состояние ожидания (fulfilled)', () => {
      const newState = ingredientsSlice.reducer(
        initialState,
        actions.getIngredients.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.ingredients).toEqual(
        actions.getIngredients.fulfilled.payload
      );
    });
  });
});
