import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TourHotelStore } from "./type";

const initialState: TourHotelStore = {
  tourFoods: [],
  tourHotels: [],
  isFetching: false,
  error: null,
};

const tourHotelSlice = createSlice({
  name: 'tourHotel',
  initialState,
  reducers: {
    getTourHotel (state, action: PayloadAction<{
      city?: string;
      top?: string;
      lat?: number | string;
			lng?: number | string;
    }>) {
      state.isFetching = true;
    },
    getTourHotelSuccess (state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.tourHotels = action.payload;
    },
    getTourHotelFailed (state, action: PayloadAction<any>) {
      state.isFetching = false;
      console.warn(action.payload);
    },
    getTourFood (state, action: PayloadAction<{
      city?: string;
      top?: string;
      lat?: number | string;
			lng?: number | string;
    }>) {
      state.isFetching = true;
    },
    getTourFoodSuccess (state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.tourFoods = action.payload;
    },
    getTourFoodFailed (state, action: PayloadAction<any>) {
      state.isFetching = false;
      console.warn(action.payload);
    },
  },
});

export const {
  getTourFood,
  getTourFoodFailed,
  getTourFoodSuccess,
  getTourHotel,
  getTourHotelFailed,
  getTourHotelSuccess,
} = tourHotelSlice.actions;

export default tourHotelSlice.reducer;