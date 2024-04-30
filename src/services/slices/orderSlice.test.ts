import {
  getFeeds,
  orderSlice,
  initialState,
  getOrders,
  getOrderByNumber,
  orderBurger
} from './orderSlice';

describe('Тестирование orderSlice', () => {
  const actions = {
    getFeeds: {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: { orders: ['order 1', 'order 2'] }
      }
    },
    getOrders: {
      pending: {
        type: getOrders.pending.type,
        payload: null
      },
      rejected: {
        type: getOrders.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: getOrders.fulfilled.type,
        payload: { orders: ['order 1', 'order 2'] }
      }
    },
    getOrderByNumber: {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['order 1'] }
      }
    },
    orderBurger: {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'error message' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: '1' } }
      }
    }
  };
  describe('Тестируем получение фида (getFeeds)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getFeeds.pending
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getFeeds.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(actions.getFeeds.rejected.error.message);
    });
    test('Тестируем состояние ожидания (fulfilled)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getFeeds.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.orderRequest).toBe(false);
      expect(newState.feed).toBe(actions.getFeeds.fulfilled.payload);
    });
  });
  describe('Тестируем получение фида (getOrders)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getOrders.pending
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.orderRequest).toBe(true);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getOrders.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(actions.getOrders.rejected.error.message);
    });
    test('Тестируем состояние ожидания (fulfilled)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getOrders.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orders).toBe(actions.getOrders.fulfilled.payload);
    });
  });
  describe('Тестируем получение фида (getOrderByNumber)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getOrderByNumber.pending
      );
      expect(newState.isLoading).toBe(true);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getOrderByNumber.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(actions.getOrders.rejected.error.message);
    });
    test('Тестируем состояние ожидания (fulfilled)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.getOrderByNumber.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orderModalData).toBe(
        actions.getOrderByNumber.fulfilled.payload.orders[0]
      );
    });
  });
  describe('Тестируем получение фида (orderBurger)', () => {
    test('Тестируем состояние ожидания (pending)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.orderBurger.pending
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.orderRequest).toBe(true);
    });
    test('Тестируем состояние ожидания (rejected)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.orderBurger.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.getOrders.rejected.error.message);
    });
    test('Тестируем состояние ожидания (fulfilled)', () => {
      const newState = orderSlice.reducer(
        initialState,
        actions.orderBurger.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orderModalData?.number).toBe(
        actions.orderBurger.fulfilled.payload.order.number
      );
    });
  });
});
