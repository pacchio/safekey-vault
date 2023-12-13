import { RootState } from '@store/index';

export const selectState = (state: RootState) => state.common;
export const selectStateLoading = (state: RootState) => state.common.isLoading;
