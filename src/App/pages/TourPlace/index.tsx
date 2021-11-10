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

	const getTourPlace: (city?: string, keyWord?: string) => void = (city, keyWord) => {
		dispatch(getTourScenicSpot({city}));
	};

	const getTourActivity: (city?: string, keyWord?: string) => void = (city, keyWord) => {
		dispatch(getTourActivities({city}));
	};

	const handleChangeCity: (city: string) => void = city => {
		dispatch(changeSelectCity({ city }));
	}

	useEffect(() => {
		getTourPlace(globalCity);
		getTourActivity(globalCity);
	}, [globalCity]);

	return (
		<>
			<main>TourPlace</main>
			{!globalCity && <HotCity handleChangeCity={handleChangeCity} />}
		</>
	)
}