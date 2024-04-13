/* eslint-disable prettier/prettier */
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Ingredients{
    ingredients: TIngredient [];
    isLoading: boolean;
    error: string | null;
  }
  
  export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => await getIngredientsApi()
  );

  const initialState: Ingredients = {
    ingredients: [],
    isLoading: false,
    error: null,
  };

  export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    selectors: {
      isLoading: (state) => state.isLoading,
      ingredients: (state) => state.ingredients,
    
    },
    extraReducers: (builder) => {
        builder.addCase(getIngredients.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getIngredients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? null; 
        });
        builder.addCase(getIngredients.fulfilled, (state, action) => {
          state.isLoading = false;
          state.ingredients = action.payload;
           
       });
    }
  });

  
  // export default ingredientsSlice.reducer
  // export const isLoading = (state: RootState) => state.ingredients.isLoading;
  export const ingredientsReducer = ingredientsSlice.reducer;
  export const { isLoading, ingredients } = ingredientsSlice.selectors;
