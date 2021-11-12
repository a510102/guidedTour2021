
type TourPicture = {
	PictureDescription1: string;
	PictureDescription2?: string;
	PictureDescription3?: string;
	PictureUrl1: string;
	PictureUrl2?: string;
	PictureUrl3?: string;
}

export type TourType = {
	Address: string;
	Description: string;
	DescriptionDetail: string;
	Name: string;
	Phone: string;
	Picture: TourPicture;
	City: string;
}

export interface TourPlaceType extends TourType {
	ZipCode: string;
}

export interface TourActivityType extends TourType {
	Location: string;
	Charge: string;
	StartTime: string;
	EndTime: string;
}

export enum TourShowDataNumber {
	DefaultScenicSpot = 10,
	SelectScenicSpot = 20,
	DefaultActivity = 4,
	SelectActivity = 8,
}