
import { TourDefaultType } from '../../../../types';

export interface TourPlaceType extends TourDefaultType {
	ZipCode: string;
}

export interface TourActivityType extends TourDefaultType {
	Location: string;
	Charge: string;
	StartTime: string;
	EndTime: string;
}

export interface TourPlaceStore {
	tourScenicSpots: TourPlaceType[];
	tourActivities: TourActivityType[];
	isFetching: boolean;
	error: any;
};
