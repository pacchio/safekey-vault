import { RootState } from '@store/index';

export const all = (state: RootState) => state.user;
export const isLoggedIn = (state: RootState) => state.user.isLoggedIn;
