import { actions, userSlice } from './userSlice';
import * as selectors from './selectors';

export const user = {
  actions: {
    ...actions,
  },
  selectors,
  slice: userSlice,
};
