import { useEffect, useState } from 'react';

import { Pagination } from '../../components/Pagination'; 
import {
	useAppSelector,
	useGlobalParams,
	useAppDispatch,
	usePagination,
} from '../../../helpers';
import { getTourFood, getTourHotel } from './slice';
import {
	selectTourFoods,
	selectTourHotels,
	selectTourError,
	selectTourIsFetching,
} from './slice/selector';
import { TourHotel } from './feature/TourHotel';
import { TourRestaurant } from './feature/TourRestaurant';
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
	const tourPlaceError = useAppSelector(selectTourError);
	const tourPlaceIsFetching = useAppSelector(selectTourIsFetching);
	const tourFoods = useAppSelector(selectTourFoods);
	const tourHotels = useAppSelector(selectTourHotels);
	const defaultCity: string = 'Taichung';

	const getTourFoods: (city?: string, top?: string) => void = (city, top) => {
		dispatch(getTourFood({city, top}));
	};

	const getTourHotels: (city?: string, top?: string) => void = (city, top) => {
		dispatch(getTourHotel({city, top}));
	};

	useEffect(() => {
		getTourFoods(defaultCity, TourShowDataNumber.DefaultFood.toString());
		getTourHotels(defaultCity, TourShowDataNumber.DefaultHotel.toString());
	}, []);

	useEffect(() => {
		if (globalCategory === TourType.TourHotel) {
			getTourHotels(globalCity);
		}
		if (globalCategory === TourType.TourFood) {
			getTourFoods(globalCity);
		}
	}, [globalCity, globalCategory]);

	const isSelected = !!(globalCity || globalKeyWord || globalKeyWord);

	const filterTourFoodList = tourFoods
		.filter(food => globalKeyWord ? (
			food.Name.includes(globalKeyWord) ||
			(food.Description && food.Description.includes(globalKeyWord)) || 
			(food.DescriptionDetail && food.DescriptionDetail.includes(globalKeyWord))
			) : food)
		.filter((food, index) => isSelected 
			? index < currentPage * TourShowDataNumber.SelectFood && index >= (currentPage - 1 ) * TourShowDataNumber.SelectFood
			: index < TourShowDataNumber.DefaultFood);
	const filterTourHotelList = tourHotels
		.filter(hotel => globalKeyWord ? (
			hotel.Name.includes(globalKeyWord) ||
			(hotel.Description && hotel.Description.includes(globalKeyWord)) || 
			(hotel.DescriptionDetail && hotel.DescriptionDetail.includes(globalKeyWord))
			) : hotel)
		.filter((hotel, index) => isSelected 
			? index < TourShowDataNumber.SelectHotel * currentPage && index >= TourShowDataNumber.SelectHotel * (currentPage - 1)
			: index < TourShowDataNumber.DefaultHotel);

	const getCurrentTotalPage: () => number = () => {
		const total = globalCategory === TourType.TourFood 
			? tourFoods.length / TourShowDataNumber.SelectFood 
			: tourHotels.length / TourShowDataNumber.SelectHotel
		return Math.ceil(total);
	}

	const totalPage = getCurrentTotalPage(); 

	return (
		<main>
			{tourPlaceIsFetching ? (
				<Loading /> ) : (
				<>
					{(globalCategory === TourType.TourHotel || !globalCategory) && (
						filterTourHotelList.length > 0 
							? <
									TourHotel filterTourHotelList={filterTourHotelList}
									globalCiry={globalCity}
								/> 
							: <TourNoData />
					)}
					{(globalCategory === TourType.TourFood || !globalCategory) && (
						filterTourFoodList.length > 0 
							?  <TourRestaurant
									filterTourRestaurantList={filterTourFoodList}
									globalCiry={globalCity}
								/>
							: <TourNoData />
					)}
					{globalCategory && 
						(filterTourFoodList.length > 0 || filterTourHotelList.length > 0) && 
							<Pagination currentTotalPage={totalPage}/>
					}
				</>
			)}
		</main>
	)
}