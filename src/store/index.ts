import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import globalStoreReducer from './globalStore';
import paginationReducer from './pagination';
import tourPlaceReducer from '../App/pages/TourScenicSpotAndActivity/slice';
import tourHotelReducer from '../App/pages/TourHotelAndrestaurant/slice';
import tourtrafficReducer from '../App/pages/TourTraffic/slice';
import { tourPlaceSaga } from '../App/pages/TourScenicSpotAndActivity/slice/saga';
import { tourHotelSaga } from '../App/pages/TourHotelAndrestaurant/slice/saga';
import { tourTrafficSaga } from '../App/pages/TourTraffic/slice/saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore ({
  reducer: {
    global: globalStoreReducer,
    pagination: paginationReducer,
    tourPlace: tourPlaceReducer,
    tourHotel: tourHotelReducer,
    tourTraffic: tourtrafficReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(tourPlaceSaga);
sagaMiddleware.run(tourHotelSaga);
sagaMiddleware.run(tourTrafficSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;