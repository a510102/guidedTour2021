import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TourPlaceStore {
	tourPlaces: any[];
	tourActivities: any[];
	isFetching: boolean;
	error: any;
}

const initialState: TourPlaceStore = {
	tourPlaces: [],
	tourActivities: [],
	isFetching: false,
	error: null,
}

export const tourPlaceSlice = createSlice({
	name: 'tourPlace',
	initialState,
	reducers: {
		getTourPlaces (state, action: PayloadAction<{city?: string}>) {
			state.isFetching = true;
		},
		getTourPlacesSuccess (state, action: PayloadAction<any>) {
			state.isFetching = false;
			console.log(action.payload);
		},
		getTourPlacesFailed (state, action: PayloadAction<any>) {
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
	getTourPlaces,
	getTourPlacesFailed,
	getTourPlacesSuccess,
	getTourActivities,
	getTourActivitiesFailed,
	getTourActivitiesSuccess,
} = tourPlaceSlice.actions;

export default tourPlaceSlice.reducer;