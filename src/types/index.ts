export enum TourType {
	TourPlace = 'tourPlace',
	TourActive = 'tourActive',
	TourFood = 'tourFood',
	TourHotel = 'tourHotel',
}

type TourPicture = {
	PictureDescription1: string;
	PictureDescription2?: string;
	PictureDescription3?: string;
	PictureUrl1: string;
	PictureUrl2?: string;
	PictureUrl3?: string;
}

export type TourDefaultType = {
	Address: string;
	Description: string;
	DescriptionDetail: string;
	Name: string;
	Phone: string;
	Picture: TourPicture;
	City: string;
}

export enum TourShowDataNumber {
	DefaultScenicSpot = 10,
	SelectScenicSpot = 20,
	DefaultActivity = 4,
	SelectActivity = 8,
	DefaultFood = 10,
	SelectFood = 20,
	DefaultHotel = 10,
	SelectHotel = 20,
}

export enum WindowWidth {
	Pad = 768,
	Mobile = 400,
}
