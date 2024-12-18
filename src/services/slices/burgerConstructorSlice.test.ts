import { addItems, burgerConstructorReducer, clearItems, deleteItems, initialState } from './burgerConstructorSlice';

describe('Тестирование burgerConstructorSlice', () => {
  const mockState = {
    ...initialState,
    bun: {
      id: '1',
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 2,
      fat: 3,
      carbohydrates: 4,
      calories: 5,
      price: 6,
      image: 'https://example.com/bun.png',
      image_mobile: 'https://example.com/bun-mobile.png',
      image_large: 'https://example.com/bun-large.png'
    },
    ingredients: [
      {
        id: '2',
        _id: '2',
        name: 'Соус',
        type: 'sauce',
        proteins: 3,
        fat: 4,
        carbohydrates: 5,
        calories: 6,
        price: 7,
        image: 'https://example.com/sauce.png',
        image_mobile: 'https://example.com/sauce-mobile.png',
        image_large: 'https://example.com/sauce-large.png'
      },
      {
        id: '3',
        _id: '3',
        name: 'Отбивная',
        type: 'main',
        proteins: 4,
        fat: 4,
        carbohydrates: 5,
        calories: 6,
        price: 7,
        image: 'https://example.com/meat.png',
        image_mobile: 'https://example.com/meat-mobile.png',
        image_large: 'https://example.com/meat-large.png'
      }
    ]
  };
  test('Тестируем добавление ингридиента (addItem)', () => {
    const newIngredient = {
      id: '5',
      _id: '5',
      name: 'Отбивная 2',
      type: 'main',
      proteins: 6,
      fat: 7,
      carbohydrates: 7,
      calories: 8,
      price: 8,
      image: 'https://example.com/meat2.png',
      image_mobile: 'https://example.com/meat2-mobile.png',
      image_large: 'https://example.com/meat2-large.png'
    };
    const expectedState = {
      ...mockState,
      ingredients: [...mockState.ingredients, newIngredient]
    };
    const newState = burgerConstructorReducer(
      mockState,
      addItems(newIngredient)
    );
    expect(newState).toEqual(expectedState);
  });
  test('Тестируем добавление булки (addItem)', () => {
    const newBun = {
      id: '9',
      _id: '9',
      name: 'Булка 2',
      type: 'bun',
      proteins: 10,
      fat: 11,
      carbohydrates: 12,
      calories: 13,
      price: 14,
      image: 'https://example.com/bun2.png',
      image_mobile: 'https://example.com/bun2-mobile.png',
      image_large: 'https://example.com/bun2-large.png'
    };
    const expectedState = {
      ...mockState,
      bun: newBun
    };
    const newState = burgerConstructorReducer(
      mockState,
      addItems(newBun)
    );
    expect(newState).toEqual(expectedState);
  });
  test('Тестируем удаление ингридиента (deleteItems)', () => {
    const deletedItem = mockState.ingredients[0];
    const expectedState = {
      ...mockState,
      ingredients: [
        ...mockState.ingredients.filter((e) => e._id !== deletedItem._id)
      ]
    };
    const newState = burgerConstructorReducer(
      mockState,
      deleteItems(deletedItem)
    );
    expect(newState).toEqual(expectedState);
  });
  test('Тестируем удаление ингридиента (clearItems)', () => {
    const newState = burgerConstructorReducer(mockState, clearItems());
    expect(newState).toEqual(initialState);
  });
});
