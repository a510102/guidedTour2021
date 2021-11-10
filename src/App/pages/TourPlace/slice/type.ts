type TourPicture = {
	PictureDescription1: string;
	PictureDescription2?: string;
	PictureDescription3?: string;
	PictureUrl1: string;
	PictureUrl2?: string;
	PictureUrl3?: string;
}

export type TourActivityType = {
	Address: string;
	Description: string;
	DescriptionDetail: string;
	Name: string;
	Phone: string;
	Picture: TourPicture;
	TicketInfo: string;
	UpdateTime: string;
}

export type TourPlaceType = {
	Name: string;
	Address: string;
	City: string;
	Picture: TourPicture;
}