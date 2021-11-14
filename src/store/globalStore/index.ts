import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalStore {
  keyWord: string;
  selectedCity: string;
  selectedCategory: string;
  isBusWayStart: boolean;
  busTripName: string;
  latLng: {
    lat: string | number;
    lng: string | number;
  }
}

const initialState: GlobalStore = {
  keyWord: '',
  selectedCity: '',
  selectedCategory: '',
  isBusWayStart: true,
  busTripName: '',
  latLng: {
    lat: '',
    lng: '',
  }
};

export const globalStore = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeKeyWord(state, action: PayloadAction<{keyWord: string}>) {
      const { keyWord } = action.payload;
      state.keyWord = keyWord;
    },
    changeSelectCity(state, action: PayloadAction<{city: string}>) {
      const { city } = action.payload;
      state.selectedCity = city;
    },
    changeSelectCategory(state, action: PayloadAction<{category: string}>) {
      const { category } = action.payload;
      state.selectedCategory = category;
    },
    changeBusTripName(state, action: PayloadAction<{busTripName: string}>) {
      const { busTripName } = action.payload;
      state.busTripName = busTripName;
    },
    changeLatLng(state, action: PayloadAction<{
      lat: number | string;
      lng: number | string;
    }>) {
      const { lat, lng } = action.payload;
      state.latLng.lat = lat;
      state.latLng.lng = lng;
    },
    toggleIsBusWayStart(state, action: PayloadAction<{isStart: boolean}>) {
      const { isStart } = action.payload;
      state.isBusWayStart = isStart;
    },
  }
});

export const { 
  changeKeyWord, 
  changeSelectCategory, 
  changeSelectCity,
  changeBusTripName,
  toggleIsBusWayStart,
  changeLatLng,
} = globalStore.actions;

export default globalStore.reducer;