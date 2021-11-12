import { RootState } from '../index';

export const selectKeyWord = ({ global }: RootState) => global.keyWord;
export const selectCategory = ({ global }: RootState) => global.selectedCategory;
export const selectCity = ({ global }: RootState) => global.selectedCity;
