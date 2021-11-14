import { lazyLoad } from "../../../utils/loadable";

export const TourHotelAndrestaurant = lazyLoad(
	() => import('.')
)