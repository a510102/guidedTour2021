import { configureStore } from '@reduxjs/toolkit';
import globaStoreReducer from './globaStore';

export const store = configureStore ({
  reducer: {
    globa: globaStoreReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;