import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { 
	getTourPlaces, 
	getTourPlacesFailed, 
	getTourPlacesSuccess,
	getTourActivities,
	getTourActivitiesFailed,
	getTourActivitiesSuccess,
} from '.'
import { fetchScenicSpot, fetchActivity, ApiResponse } from '../../../Api';


function* fetchScenicSpotSaga(action: PayloadAction<{city?: string}>) {
	try {
		const { city } = action.payload;
		const response: ApiResponse = yield call(fetchScenicSpot, city);
		if (!response.status) {
			throw response.data;
		}
		yield put(getTourPlacesSuccess(response.data));
	} catch (error) {
		yield put(getTourPlacesFailed(error))
	}
}

function* fetchActivitySaga(action: PayloadAction<{city?: string}>) {
	try {
		const { city } = action.payload;
		const response: ApiResponse = yield call(fetchActivity, city);
		if (!response.status) {
			throw response.data;
		}
		yield put(getTourActivitiesSuccess(response.data));
	} catch (error) {
		yield put(getTourActivitiesFailed(error))
	}
}

function* tourPlaceSaga() {
	yield takeLatest(getTourPlaces.type, fetchScenicSpotSaga);
	yield takeLatest(getTourActivities.type, fetchActivitySaga);
}

export default tourPlaceSaga;