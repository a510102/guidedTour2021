import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobaStore {
  keyWord: string;
  selectedCity: string;
  selectedCategory: string;
}

const initialState: GlobaStore = {
  keyWord: '',
  selectedCity: '',
  selectedCategory: '',
};

export const gllobaStore = createSlice({
  name: 'globa',
  initialState,
  reducers: {
    changeKeyWord(state, action: PayloadAction<{keyWord: string}>) {
      const { keyWord } = action.payload;
      state.keyWord = keyWord;
    },
    changeSelectCity(state, action: PayloadAction<{city: string}>) {
      const { city } = action.payload;
      state.selectedCategory = city;
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
} = gllobaStore.actions;

export default gllobaStore.reducer;