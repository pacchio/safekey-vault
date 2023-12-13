import { actions, commonSlice } from './commonSlice';
import * as selectors from './selectors';

export const common = {
  actions: {
    ...actions,
  },
  selectors,
  slice: commonSlice,
};
