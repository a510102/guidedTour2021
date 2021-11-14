import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TourTrafficStore } from './type';

const initialState: TourTrafficStore = {
  busStops: [],
  currentTripStopInfo: [],
  currentBusActivity: [],
  isFetching: false,
  error: null,
};

const tourTrafficSlice = createSlice({
  name: 'tourTraffic',
  initialState,
  reducers: {
    getBusStops(state) {
      state.isFetching = true;
    },
    getBusStopsSuccess(state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.busStops = action.payload;
    },
    getBusStopsFailed(state, action: PayloadAction<any>) {
      state.isFetching = false;
      console.warn(action.payload);
    },
    getCurrentStopInfo(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    getCurrentStopInfoSuccess(state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.currentTripStopInfo = action.payload;
    },
    getCurrentStopInfoFailed(state, action: PayloadAction<any>) {
      state.isFetching = false;
      console.warn(action.payload);
    },
    getCurrentBusActivity(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    getCurrentBusActivitySuccess(state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.currentBusActivity = action.payload;
    },
    getCurrentBusActivityFailed(state, action: PayloadAction<any>) {
      state.isFetching = false;
      console.warn(action.payload);
    },
    cleargetCurrentStopInfo(state) {
      state.currentTripStopInfo = [];
    },
  },
});

export const {
  getBusStops,
  getBusStopsFailed,
  getBusStopsSuccess,
  getCurrentStopInfo,
  getCurrentStopInfoFailed,
  getCurrentStopInfoSuccess,
  cleargetCurrentStopInfo,
  getCurrentBusActivity,
  getCurrentBusActivityFailed,
  getCurrentBusActivitySuccess,
} = tourTrafficSlice.actions;

export default tourTrafficSlice.reducer;
