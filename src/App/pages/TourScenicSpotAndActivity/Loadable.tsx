import { lazyLoad } from "../../../utils/loadable";

export const TourScenicSpotAndActivity = lazyLoad(
	() => import('.')
)