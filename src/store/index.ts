import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import globalStoreReducer from './globalStore';
import paginationReducer from './pagination';
import tourPlaceReducer from '../App/pages/TourPlace/slice';

import { tourPlaceSaga } from '../App/pages/TourPlace/slice/saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore ({
  reducer: {
    global: globalStoreReducer,
    pagination: paginationReducer,
    tourPlace: tourPlaceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(tourPlaceSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;