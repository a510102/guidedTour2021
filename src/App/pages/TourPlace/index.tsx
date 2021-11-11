import { useEffect } from 'react';

import { HotCity } from '../../components/HotCity';
import {
	useAppSelector,
	useGlobalParams,
	useAppDispatch,
} from '../../../helpers';
import { getTourActivities, getTourScenicSpot } from './slice';
import {
	selectError,
	selectIsFetching,
	selectTourActivities,
	selectTourScenicSpots,
} from './slice/selector';
import { changeSelectCity } from '../../../store/globalStore';
import { TourScenicSpot } from './feature/TourScenicSpot';
import { TourActivity } from './feature/TourActivity';
import { TourType } from '../../../types';

enum TourShowDataNumber {
	DefaultScenicSpot = 4,
	DefaultActivity = 10,
}

export default function TourPlace () {
	const {
		globalCategory,
		globalCity,
		globalKeyWord,
	} = useGlobalParams();
	const dispatch = useAppDispatch();
	const tourPlaceError = useAppSelector(selectError);
	const tourPlaceIsFetching = useAppSelector(selectIsFetching);
	const tourActivities = useAppSelector(selectTourActivities);
	const tourScenicSpots = useAppSelector(selectTourScenicSpots);

	const getTourPlace: (city?: string, top?: string, keyWord?: string) => void = (city, top, keyWord) => {
		dispatch(getTourScenicSpot({city, top}));
	};

	const getTourActivity: (city?: string, top?: string, keyWord?: string) => void = (city, top, keyWord) => {
		dispatch(getTourActivities({city, top}));
	};

	const handleChangeCity: (city: string) => void = city => {
		dispatch(changeSelectCity({ city }));
	}

	useEffect(() => {
		getTourPlace('', TourShowDataNumber.DefaultScenicSpot.toString());
		getTourActivity('', TourShowDataNumber.DefaultActivity.toString());
	}, []);

	// useEffect(() => {
	// 	getTourPlace(globalCity);
	// 	getTourActivity(globalCity);
	// }, [globalCity]);

	const isSelected = globalCity || globalCity || globalKeyWord;
	const filterTourActivityList = tourActivities.filter((activity, index) => isSelected ? activity : index < TourShowDataNumber.DefaultActivity);
	const filterTourScenicSpotList = tourScenicSpots.filter((activity, index) => isSelected ? activity : index < TourShowDataNumber.DefaultScenicSpot);

	return (
		<main>
			{!isSelected && (
				<HotCity handleChangeCity={handleChangeCity} />
				)}
			{(globalCategory === TourType.TourPlace || !globalCategory) && <TourScenicSpot filterTourScenicSpotList={filterTourScenicSpotList} />}
			{(globalCategory === TourType.TourActive || !globalCategory) && (<TourActivity filterTourActivityList={filterTourActivityList} />)}
		</main>
	)
}