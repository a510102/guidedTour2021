import { TourDefaultType } from '../../../../types';

export interface TourRestaurantProps extends TourDefaultType {
  ZipCode: string;
}

export interface TourHotelProps extends TourDefaultType {
  ZipCode: string;
}

export interface TourHotelStore {
  tourFoods: TourRestaurantProps[];
  tourHotels: TourHotelProps [];
  isFetching : boolean;
  error: any;
};