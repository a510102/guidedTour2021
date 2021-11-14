import { RootState } from '../index';

export const selectKeyWord = ({ global }: RootState) => global.keyWord;
export const selectCategory = ({ global }: RootState) => global.selectedCategory;
export const selectCity = ({ global }: RootState) => global.selectedCity;
export const selectBusTripName = ({ global }: RootState) => global.busTripName;
export const selectIsBusWayStart = ({ global }: RootState) => global.isBusWayStart;
export const selectLat = ({ global }: RootState) => global.latLng.lat;
export const selectLng = ({ global }: RootState) => global.latLng.lng;
