import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn?: boolean;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const actions = userSlice.actions;
