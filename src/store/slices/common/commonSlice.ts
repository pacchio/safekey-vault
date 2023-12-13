import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  isLoading?: boolean;
  previousPage?: string;
  currentPage?: string;
}

const initialState: CommonState = {};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPreviousPage(state, action) {
      state.previousPage = action.payload;
    },
  },
});

export const actions = commonSlice.actions;
