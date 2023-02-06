import { configureStore } from '@reduxjs/toolkit';
import ApiReducer from './features/apiSlice';

export const store = configureStore({
    reducer: {
      api: ApiReducer,
    },
  })