import { useEffect, useState } from 'react';

import { HotCity } from '../../components/HotCity';
import { Pagination } from '../../components/Pagination'; 
import {
	useAppSelector,
	useGlobalParams,
	useAppDispatch,
	usePagination,
} from '../../../helpers';
import { getTourActivities, getTourScenicSpot } from './slice';
import {
	selectError,
	selectIsFetching,
	selectTourActivities,
	selectTourScenicSpots,
} from './slice/selector';
import { TourScenicSpot } from './feature/TourScenicSpot';
import { TourActivity } from './feature/TourActivity';
import { Loading } from '../../components/Loading';
import { TourType } from '../../../types';
import { TourShowDataNumber } from '../../../types';
import { TourNoData } from '../../components/TourNoData';

export default function TourPlace () {
	const {
		globalCategory,
		globalCity,
		globalKeyWord,
	} = useGlobalParams();
	const { currentPage } = usePagination();
	const dispatch = useAppDispatch();
	const tourPlaceError = useAppSelector(selectError);
	const tourPlaceIsFetching = useAppSelector(selectIsFetching);
	const tourActivities = useAppSelector(selectTourActivities);
	const tourScenicSpots = useAppSelector(selectTourScenicSpots);
	const defaultCity: string = 'Taichung';
	const [selectHotCity, setSelectHotCity] = useState<string>(defaultCity);

	const getTourPlace: (city?: string, top?: string) => void = (city, top) => {
		dispatch(getTourScenicSpot({city, top}));
	};

	const getTourActivity: (city?: string, top?: string) => void = (city, top) => {
		dispatch(getTourActivities({city, top}));
	};

	const handleChangeHotCity: (city: string) => void = city => {
		if (city !== selectHotCity) {
			setSelectHotCity(city);
		}
	};

	useEffect(() => {
		getTourPlace(selectHotCity, TourShowDataNumber.DefaultScenicSpot.toString());
		getTourActivity(selectHotCity, TourShowDataNumber.DefaultActivity.toString());
	}, [selectHotCity]);

	useEffect(() => {
		if (globalCategory === TourType.TourPlace) {
			getTourPlace(globalCity);
		}
		if (globalCategory === TourType.TourActive) {
			getTourActivity(globalCity);
		}
	}, [globalCity, globalCategory]);

	const isSelected = !!(globalCity || globalCategory || globalKeyWord);
	const filterTourActivityList = tourActivities
		.filter(activity => globalKeyWord ? (
			activity.Name.includes(globalKeyWord) ||
			(activity.Description && activity.Description.includes(globalKeyWord)) || 
			(activity.DescriptionDetail && activity.DescriptionDetail.includes(globalKeyWord))
			) : activity)
		.filter((activity, index) => isSelected
			? index < currentPage * TourShowDataNumber.SelectActivity && index >= (currentPage - 1 ) * TourShowDataNumber.SelectActivity 
			: index < TourShowDataNumber.DefaultActivity);
	const filterTourScenicSpotList = tourScenicSpots
		.filter(scenicSpot => globalKeyWord ? (
			scenicSpot.Name.includes(globalKeyWord) ||
			(scenicSpot.Description && scenicSpot.Description.includes(globalKeyWord)) || 
			(scenicSpot.DescriptionDetail && scenicSpot.DescriptionDetail.includes(globalKeyWord))
			) : scenicSpot)
		.filter((scenicSpot, index) => isSelected 
			? index < TourShowDataNumber.SelectScenicSpot * currentPage && index >= TourShowDataNumber.SelectScenicSpot * (currentPage - 1) 
			: index < TourShowDataNumber.DefaultScenicSpot);

	const getCurrentTotalPage: () => number = () => {
		const total = globalCategory === TourType.TourPlace 
			? tourScenicSpots.length / TourShowDataNumber.SelectScenicSpot 
			: tourActivities.length / TourShowDataNumber.SelectActivity
		return Math.ceil(total);
	}

	const totalPage = getCurrentTotalPage(); 

	return (
		<main>
			{tourPlaceIsFetching ? (
				<Loading /> ) : (
				<>
					{!isSelected && (
						<HotCity handleChangeCity={handleChangeHotCity} />
						)}
					{(globalCategory === TourType.TourActive || !globalCategory) && (
						filterTourActivityList.length > 0 
							? <TourActivity filterTourActivityList={filterTourActivityList} /> 
							: <TourNoData />
					)}
					{(globalCategory === TourType.TourPlace || !globalCategory) && (
						filterTourScenicSpotList.length > 0 
							?  <TourScenicSpot
									filterTourScenicSpotList={filterTourScenicSpotList}
									globalCiry={globalCity}
								/>
							: <TourNoData />
					)}
					{globalCategory && 
						(filterTourScenicSpotList.length > 0 || filterTourActivityList.length > 0) && 
							<Pagination currentTotalPage={totalPage}/>
					}
				</>
			)}
		</main>
	)
}