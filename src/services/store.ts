import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/burgerSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
