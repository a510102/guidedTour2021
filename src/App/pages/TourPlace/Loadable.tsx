import { lazyLoad } from "../../../utils/loadable";

export const TourPlace = lazyLoad(
	() => import('.')
)