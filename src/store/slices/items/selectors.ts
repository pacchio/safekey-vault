import { RootState } from '@store/index';

export const selectItemsState = (state: RootState) => state.items;
export const selectItems = (state: RootState) => state.items.items;
