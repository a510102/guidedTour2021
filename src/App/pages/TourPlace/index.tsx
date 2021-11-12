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
import { TourType } from '../../../types';
import { TourShowDataNumber } from './slice/type';

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

	const getTourPlace: (city?: string, top?: string, keyWord?: string) => void = (city, top, keyWord) => {
		dispatch(getTourScenicSpot({city, top}));
	};

	const getTourActivity: (city?: string, top?: string, keyWord?: string) => void = (city, top, keyWord) => {
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

	const isSelected = globalCity || globalCity || globalKeyWord;
	const filterTourActivityList = tourActivities.filter((activity, index) => isSelected
		? index < currentPage * TourShowDataNumber.SelectActivity && index >= (currentPage - 1 ) * TourShowDataNumber.SelectActivity 
		: index < TourShowDataNumber.DefaultActivity);
	const filterTourScenicSpotList = tourScenicSpots.filter((activity, index) => isSelected 
		? index < TourShowDataNumber.SelectScenicSpot * currentPage && index >= TourShowDataNumber.SelectScenicSpot * (currentPage - 1) 
		: index < TourShowDataNumber.DefaultScenicSpot);

	const getCurrentTotalPage: () => number = () => {
		const total = globalCategory === TourType.TourPlace 
			? tourScenicSpots.length / TourShowDataNumber.SelectScenicSpot 
			: tourActivities.length / TourShowDataNumber.SelectActivity
		console.log(Math.ceil(total), filterTourActivityList.length, TourShowDataNumber.SelectActivity);
		return Math.ceil(total);
	}

	const totalPage = getCurrentTotalPage(); 

	return (
		<main>
			{!isSelected && (
				<HotCity handleChangeCity={handleChangeHotCity} />
				)}
			{(globalCategory === TourType.TourPlace || !globalCategory) && <TourScenicSpot filterTourScenicSpotList={filterTourScenicSpotList} />}
			{(globalCategory === TourType.TourActive || !globalCategory) && (<TourActivity filterTourActivityList={filterTourActivityList} />)}
			{globalCategory && <Pagination currentTotalPage={totalPage}/>}
		</main>
	)
}