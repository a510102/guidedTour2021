import { lazyLoad } from "../../../utils/loadable";

export const TourTraffic = lazyLoad(
	() => import('.')
)