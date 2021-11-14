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

export default function TourHotelAndrestaurant () {
	const {
		globalCategory,
		globalCity,
		globalKeyWord,
		globalLat,
		globalLng,
	} = useGlobalParams();
	const { currentPage } = usePagination();
	const dispatch = useAppDispatch();
	const tourPlaceError = useAppSelector(selectTourError);
	const tourPlaceIsFetching = useAppSelector(selectTourIsFetching);
	const tourFoods = useAppSelector(selectTourFoods);
	const tourHotels = useAppSelector(selectTourHotels);
	const defaultCity: string = 'Taichung';

	const getTourFoods: (
		city?: string, 
		top?: string, 
		lat?: number | string,
		lng?: number | string,
		) => void = (city, top, lat, lng) => {
		dispatch(getTourFood({city, top, lat, lng}));
	};

	const getTourHotels: (
		city?: string,
		top?: string,
		lat?: number | string,
		lng?: number | string,
		) => void = (city, top, lat, lng) => {
		dispatch(getTourHotel({city, top, lat, lng}));
	};

	useEffect(() => {
		getTourFoods(defaultCity, TourShowDataNumber.DefaultFood.toString());
		getTourHotels(defaultCity, TourShowDataNumber.DefaultHotel.toString());
	}, []);

	useEffect(() => {
		if (globalCategory === TourType.TourHotel || (!globalCategory && (globalCity || (globalLng && globalLat)))) {
			getTourHotels(globalCity);
		}
		if (globalCategory === TourType.TourFood || (!globalCategory && (globalCity || (globalLng && globalLat)))) {
			getTourFoods(globalCity);
		}
	}, [globalCity, globalCategory, globalLat, globalLng]);

	const isSelectedWithoutCategory = !(globalCategory) && !(globalKeyWord || globalKeyWord);
	const isSelected = !!(globalCity || globalKeyWord || globalKeyWord);

	const filterTourFoodList = tourFoods
		.filter(food => globalKeyWord ? (
			food.Name.includes(globalKeyWord) ||
			(food.Description && food.Description.includes(globalKeyWord)) || 
			(food.DescriptionDetail && food.DescriptionDetail.includes(globalKeyWord))
			) : food)
		.filter((food, index) => !isSelectedWithoutCategory 
			? index < currentPage * TourShowDataNumber.SelectFood && index >= (currentPage - 1 ) * TourShowDataNumber.SelectFood
			: index < TourShowDataNumber.DefaultFood * currentPage && index >= TourShowDataNumber.DefaultFood * (currentPage - 1));
	const filterTourHotelList = tourHotels
		.filter(hotel => globalKeyWord ? (
			hotel.Name.includes(globalKeyWord) ||
			(hotel.Description && hotel.Description.includes(globalKeyWord)) || 
			(hotel.DescriptionDetail && hotel.DescriptionDetail.includes(globalKeyWord))
			) : hotel)
		.filter((hotel, index) => !isSelectedWithoutCategory 
			? index < TourShowDataNumber.SelectHotel * currentPage && index >= TourShowDataNumber.SelectHotel * (currentPage - 1)
			: index < TourShowDataNumber.DefaultHotel * currentPage && index >= TourShowDataNumber.DefaultHotel * (currentPage - 1));

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
					{totalPage > 1 && 
						(filterTourFoodList.length > 0 || filterTourHotelList.length > 0) && 
							<Pagination currentTotalPage={totalPage}/>
					}
				</>
			)}
		</main>
	)
}