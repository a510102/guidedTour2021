import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
	getTourActivities,
	getTourActivitiesFailed,
	getTourActivitiesSuccess,
	getTourScenicSpot,
	getTourScenicSpotFailed,
	getTourScenicSpotSuccess,
} from '.';
import {
	fetchActivity,
	fetchScenicSpot,
	ApiResponseType,
} from '../../../Api';

function* fetchScenicSpotSaga(action: PayloadAction<{
	city?: string; 
	top?: string;
	lat?: number | string;
	lng?: number | string;
}>) {
	try {
		const { city, top, lat, lng } = action.payload;
		const response: ApiResponseType = yield call(fetchScenicSpot, city, top, lat, lng);
		if (!response.success) {
			throw response.data;
		}
		yield put(getTourScenicSpotSuccess(response.data));
	} catch (error) {
		yield put(getTourScenicSpotFailed(error));
	}
}

function* fetchActivitySaga(action: PayloadAction<{
	city?: string;
	top?: string;
	lat?: number | string;
	lng?: number | string;
}>) {
	try {
		const { city, top, lat, lng } = action.payload;
		const response: ApiResponseType = yield call(fetchActivity, city, top, lat, lng);
		if (!response.success) {
			throw response.data;
		}
		yield put(getTourActivitiesSuccess(response.data));
	} catch (error) {
		yield put(getTourActivitiesFailed(error));
	}
}

export function* tourPlaceSaga() {
	yield takeLatest(getTourScenicSpot.type, fetchScenicSpotSaga);
	yield takeLatest(getTourActivities.type, fetchActivitySaga);
}