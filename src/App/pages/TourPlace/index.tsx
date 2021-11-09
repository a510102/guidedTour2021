import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../helpers';
import { getTourPlaces } from './slice';

export default function TourPlace () {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(getTourPlaces({}));
	}, []);
	return (
		<main>TourPlace</main>
	)
}