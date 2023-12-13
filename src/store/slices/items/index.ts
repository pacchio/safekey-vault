import { actionTypes } from './actionTypes';
import { actions, itemsSlice } from './itemsSlice';
import * as selectors from './selectors';

export const items = {
  actionTypes,
  actions: {
    ...actions,
  },
  selectors,
  slice: itemsSlice,
};
