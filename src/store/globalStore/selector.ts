import { RootState } from '../index';

export const selectKeyWord = (state: RootState) => state.global.keyWord;
export const selectCategory = (state: RootState) => state.global.selectedCategory;
export const selectCity = (state: RootState) => state.global.selectedCity;
