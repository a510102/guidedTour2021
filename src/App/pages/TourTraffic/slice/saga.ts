import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchBusStops,
  fetchEstimatedTimeOfArrival,
  fetchRealTimeNearStop,
  ApiResponseType,
} from '../../../Api';
import {
  getBusStops,
  getBusStopsFailed,
  getBusStopsSuccess,
  getCurrentStopInfo,
  getCurrentStopInfoFailed,
  getCurrentStopInfoSuccess,
  getCurrentBusActivity,
  getCurrentBusActivityFailed,
  getCurrentBusActivitySuccess,
} from '.';

function* fetchBusStopsSaga() {
  try {
    const response: ApiResponseType = yield call(fetchBusStops);
    if (!response.status) {
      throw response.data;
    }
    yield put(getBusStopsSuccess(response.data))
  } catch (error) {
    yield put(getBusStopsFailed(error));
  }
}

function* fetchEstimatedTimeOfArrivalSaga(action: PayloadAction<{tripName: string}>) {
  try {
    const { tripName } = action.payload;
    const response: ApiResponseType = yield call(fetchEstimatedTimeOfArrival, tripName);
    if (!response.status) {
      throw response.data;
    }
    yield put(getCurrentStopInfoSuccess(response.data))
  } catch (error) {
    yield put(getCurrentStopInfoFailed(error));
  }
};

function* fetchRealTimeNearStopSaga(action: PayloadAction<{tripName: string}>) {
  try {
    const { tripName } = action.payload;
    const response: ApiResponseType = yield call(fetchRealTimeNearStop, tripName);
    if (!response.status) {
      throw response.data;
    }
    yield put(getCurrentBusActivitySuccess(response.data))
  } catch (error) {
    yield put(getCurrentBusActivityFailed(error));
  }
};

export function* tourTrafficSaga() {
  yield takeLatest(getBusStops.type, fetchBusStopsSaga);
  yield takeLatest(getCurrentStopInfo.type, fetchEstimatedTimeOfArrivalSaga);
  yield takeLatest(getCurrentBusActivity.type, fetchRealTimeNearStopSaga);

};
