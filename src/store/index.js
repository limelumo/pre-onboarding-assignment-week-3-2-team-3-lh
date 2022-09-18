import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import commentSlice from './comment-slice';
import pageSlice from './page-slice';

const logger = createLogger();

const store = configureStore({
  reducer: { comment: commentSlice, page: pageSlice },
});

export default store;
