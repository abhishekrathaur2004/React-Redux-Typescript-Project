import { configureStore } from '@reduxjs/toolkit';
import dataSetReducer from '../feature/dataSlice';

export const store = configureStore({
  reducer: {
    dataSet : dataSetReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;