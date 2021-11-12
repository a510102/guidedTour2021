type TourPicture = {
	PictureDescription1: string;
	PictureDescription2?: string;
	PictureDescription3?: string;
	PictureUrl1: string;
	PictureUrl2?: string;
	PictureUrl3?: string;
}

export type TourPlaceType = {
	Address: string;
	Description: string;
	DescriptionDetail: string;
	Name: string;
	Phone: string;
	Picture: TourPicture;
	TicketInfo: string;
	OpenTime: string;
}

export type TourActivityType = {
	Name: string;
	Address: string;
	City: string;
	Picture: TourPicture;
	Organizer: string;
}

export enum TourShowDataNumber {
	DefaultScenicSpot = 4,
	SelectScenicSpot = 8,
	DefaultActivity = 10,
	SelectActivity = 20,
}