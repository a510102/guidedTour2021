import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import {
	useAppDispatch,
	useAppSelector,
	useGlobalParams,
	useCountDown,
} from '../../../helpers';
import { Loading } from '../../components/Loading';
import { BusStopInfo } from './feature/BusStopInfo';
import {
	getBusStops,
	getCurrentBusActivity,
	getCurrentStopInfo,
	
} from './slice';
import {
	selectBusStop,
	selectCurrentBusActivity,
	selectCurrentTripStopInfo,
	selectIsFetching,
} from './slice/selector';

export default function TourTraffic () {
	const dispatch = useAppDispatch();
	const busStop = useAppSelector(selectBusStop);
	const currentBusActivity = useAppSelector(selectCurrentBusActivity);
	const currentTripStopInfo = useAppSelector(selectCurrentTripStopInfo);
	const isFetching = useAppSelector(selectIsFetching);
	const { busTripName, isBusWayStart } = useGlobalParams();

	const getBusInfo: (tripName: string) => void = useCallback(tripName => {
		dispatch(getCurrentStopInfo({ tripName }));
		dispatch(getCurrentBusActivity({ tripName }));
	}, []);

	const { countDownTime , startCountDown ,stopCountDown } = useCountDown(15);

	useEffect(() => {
		if (busStop.length === 0) {
			dispatch(getBusStops());
		}
	}, [busStop]);

	useEffect(() => {
		if (busTripName) {
			getBusInfo(busTripName);
			startCountDown();
		}
	}, [busTripName]);

	useEffect(() => {
		if (countDownTime === 0) {
			startCountDown();
			getBusInfo(busTripName);
		}
	}, [countDownTime, startCountDown, busTripName, getBusInfo]);
	useEffect(() => {
		return () => {
			stopCountDown();
		}
	}, []);

	return (
		<main>
			<Helmet>
				<title>Bus</title>
			</Helmet>
			{isFetching && currentBusActivity.length === 0
				? <Loading /> 
				: <BusStopInfo
						busStopList={currentTripStopInfo}
						bustActivity={currentBusActivity}
						isBusWayStart={isBusWayStart}
					/>
			}
		</main>
	)
}