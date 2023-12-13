import { configureStore } from '@reduxjs/toolkit';
import { common, items, user } from './slices';

export const store = configureStore({
  reducer: {
    [common.slice.name]: common.slice.reducer,
    [items.slice.name]: items.slice.reducer,
    [user.slice.name]: user.slice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
