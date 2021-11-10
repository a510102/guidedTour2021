import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TourPlaceStore {
	tourScenicSpots: any[];
	tourActivities: any[];
	isFetching: boolean;
	error: any;
};

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
		getTourScenicSpot (state, action: PayloadAction<{city?: string}>) {
			state.isFetching = true;
		},
		getTourScenicSpotSuccess (state, action: PayloadAction<any>) {
			state.isFetching = false;
			console.log(action.payload);
		},
		getTourScenicSpotFailed (state, action: PayloadAction<any>) {
			state.isFetching = false;
			console.warn(action.payload);
		},
		getTourActivities (state, action: PayloadAction<{city?: string}>) {
			state.isFetching = true;
		},
		getTourActivitiesSuccess (state, action: PayloadAction<any>) {
			state.isFetching = false;
			console.log(action.payload);
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