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
	APiResponseType,
} from '../../../Api';

function* fetchScenicSpotSaga(action: PayloadAction<{city?: string}>) {
	try {
		const { city } = action.payload;
		const response: APiResponseType = yield call(fetchScenicSpot, city);
		if (!response.success) {
			throw response.data;
		}
		yield put(getTourScenicSpotSuccess(response.data));
	} catch (error) {
		yield put(getTourScenicSpotFailed(error));
	}
}

function* fetchActivitySaga(action: PayloadAction<{city?: string}>) {
	try {
		const { city } = action.payload;
		const response: APiResponseType = yield call(fetchActivity, city);
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