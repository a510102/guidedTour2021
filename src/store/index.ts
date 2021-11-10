import { configureStore } from '@reduxjs/toolkit';
import globalStoreReducer from './globalStore';

export const store = configureStore ({
  reducer: {
    global: globalStoreReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;