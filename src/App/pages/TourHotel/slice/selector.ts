import { RootState } from "../../../../store";

export const selectTourHotels = ({ tourHotel }: RootState) => tourHotel.tourHotels;
export const selectTourFoods = ({ tourHotel }: RootState) => tourHotel.tourFoods;
export const selectTourIsFetching = ({ tourHotel }: RootState) => tourHotel.isFetching;
export const selectTourError = ({ tourHotel }: RootState) => tourHotel.error;
 