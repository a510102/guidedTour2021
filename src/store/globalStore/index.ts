import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalStore {
  keyWord: string;
  selectedCity: string;
  selectedCategory: string;
}

const initialState: GlobalStore = {
  keyWord: '',
  selectedCity: '',
  selectedCategory: '',
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
  }
});

export const { 
  changeKeyWord, 
  changeSelectCategory, 
  changeSelectCity 
} = globalStore.actions;

export default globalStore.reducer;