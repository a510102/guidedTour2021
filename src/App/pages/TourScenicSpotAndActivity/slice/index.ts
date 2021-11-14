import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TourPlaceStore } from './type';

const initialState: TourPlaceStore = {
	tourScenicSpots: [],
	tourActivities: [],
	isFetching: false,
	error: null,
}

const tourPlaceSlice = createSlice({
	name: 'tourPlace',
	initialState,
	reducers: {
		getTourScenicSpot (state, action: PayloadAction<{
			city?: string; 
			top?: string;
			lat?: number | string;
			lng?: number | string;
		}>) {
			state.isFetching = true;
		},
		getTourScenicSpotSuccess (state, action: PayloadAction<any>) {
			state.isFetching = false;
			state.tourScenicSpots = action.payload;
		},
		getTourScenicSpotFailed (state, action: PayloadAction<any>) {
			state.isFetching = false;
			console.warn(action.payload);
		},
		getTourActivities (state, action: PayloadAction<{
			city?: string; 
			top?: string;
			lat?: number | string;
			lng?: number | string;
		}>) {
			state.isFetching = true;
		},
		getTourActivitiesSuccess (state, action: PayloadAction<any>) {
			state.isFetching = false;
			state.tourActivities = action.payload;
		},
		getTourActivitiesFailed (state, action: PayloadAction<any>) {
			state.isFetching = false;
			console.warn(action.payload);
		},
	},
});

export const {
	getTourActivities,
	getTourActivitiesFailed,
	getTourActivitiesSuccess,
	getTourScenicSpot,
	getTourScenicSpotFailed,
	getTourScenicSpotSuccess
} = tourPlaceSlice.actions;

export default tourPlaceSlice.reducer;