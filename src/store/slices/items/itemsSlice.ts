import { createSlice } from '@reduxjs/toolkit';
import type { Account } from 'types/account';

export interface ItemsState {
  items: Account[];
}

const initialState: ItemsState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const actions = itemsSlice.actions;
