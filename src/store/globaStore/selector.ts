import { RootState } from '../index';

export const selectKeyWord = (state: RootState) => state.globa.keyWord;
export const selectCategory = (state: RootState) => state.globa.selectedCategory;
export const selectCity = (state: RootState) => state.globa.selectedCity;
