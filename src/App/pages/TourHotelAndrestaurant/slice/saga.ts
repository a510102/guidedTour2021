import { PayloadAction } from '@reduxjs/toolkit';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  fetchHotel,
  fetchRestaurant,
  ApiResponseType,
} from '../../../Api';
import { 
  getTourFood,
  getTourFoodFailed,
  getTourFoodSuccess,
  getTourHotel,
  getTourHotelFailed,
  getTourHotelSuccess
} from '.';

function* fetchHotelSaga (action: PayloadAction<{
  city?: string;
  top?: string;
  lat?: number | string;
	lng?: number | string;
}>) {
  try {
    const { city, top, lat, lng } = action.payload;
    const response: ApiResponseType = yield call(fetchHotel, city, top, lat, lng);

    if (!response.success) {
      throw response.data;
    }
    yield put(getTourHotelSuccess(response.data))
  } catch (error) {
    yield put(getTourHotelFailed(error));
  }
};

function* fetchRestaurantSaga (action: PayloadAction<{
  city?: string;
  top?: string;
  lat?: number | string;
	lng?: number | string;
}>) {
  try {
    const { city, top, lat, lng } = action.payload;
    const response: ApiResponseType = yield call(fetchRestaurant, city, top, lat, lng);

    if (!response.success) {
      throw response.data;
    }
    yield put(getTourFoodSuccess(response.data))
  } catch (error) {
    yield put(getTourFoodFailed(error));
  }
};

export function* tourHotelSaga() {
  yield takeLatest(getTourFood.type, fetchRestaurantSaga);
  yield takeLatest(getTourHotel.type, fetchHotelSaga);
}