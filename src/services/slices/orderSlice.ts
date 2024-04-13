/* eslint-disable prettier/prettier */
import { TFeedsResponse, getFeedsApi, getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Order {
  orderRequest:boolean;
  orderModalData: null | TOrder;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  feed: TFeedsResponse | null;
}

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

const initialState: Order = {
  orderRequest: false,
  orderModalData: null,
  orders: [],
  isLoading: false,
  error: null,
  feed: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrder(state) {
      state.orderRequest = false;
      state.orderModalData = null
    }
  },
  extraReducers: (builder) => {
      builder.addCase( getFeeds.pending, (state) => {
          state.isLoading = true; 
          state.error = null;
      });
      builder.addCase( getFeeds.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? null;
      });
      builder.addCase( getFeeds.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orderRequest = false;
          state.feed = action.payload;
          state.orders = action.payload.orders;
    });
      builder.addCase( getOrders.pending, (state) => {
          state.isLoading = true;
          state.orderRequest = true;
      });
      builder.addCase( getOrders.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? null;
      });
      builder.addCase( getOrders.fulfilled, (state, action) => {
          state.orderRequest = false;
          state.orders = action.payload;
      });
      builder.addCase( orderBurger.pending, (state) => {
          state.isLoading = true; 
          state.orderRequest = true; 
      });
      builder.addCase( orderBurger.rejected, (state, action) => {
          state.isLoading = false;
          state.orderRequest = false;
          state.error = action.error.message ?? null;
      });
      builder.addCase( orderBurger.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orderRequest = false;
          state.orderModalData = action.payload.order;
      });
      builder.addCase( getOrderByNumber.pending, (state) => {
          state.isLoading = true; 
      });
      builder.addCase( getOrderByNumber.rejected, (state, action) => {
          state.error = action.error.message ?? null;
      });
      builder.addCase( getOrderByNumber.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orderModalData = action.payload.orders[0];
      });
  }
});

export const { closeOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
