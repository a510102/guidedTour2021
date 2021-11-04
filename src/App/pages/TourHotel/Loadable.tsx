import { lazyLoad } from "../../../utils/loadable";

export const TourHotel = lazyLoad(
	() => import('.')
)