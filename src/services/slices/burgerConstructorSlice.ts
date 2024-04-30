/* eslint-disable prettier/prettier */
import { TConstructorIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from "@reduxjs/toolkit";

interface BurgerConstructor {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
    initialState,
    reducers: {
        addItems: (state,  action) => {
            const payloadId = {...action.payload, id:nanoid()};
            if (action.payload.type === 'bun') {
              state.bun = payloadId
            } else {
              state.ingredients.push(payloadId)
            }
        },
        deleteItems: (state, action) => {
          if (action.payload.type !== 'bun') {
            state.ingredients =  state.ingredients.filter((ingredients) => 
            ingredients.id !== action.payload)
          }
        },
        clearItems: (state) =>{
          state.bun = null;
          state.ingredients = [];
        },

}});

export const { addItems, deleteItems, clearItems } = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
