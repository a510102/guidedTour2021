import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
	selectCategory,
	selectCity,
	selectKeyWord, 
	selectBusTripName,
	selectIsBusWayStart,
	selectLat,
	selectLng,
} from '../store/globalStore/selector';
import {
	selectCurrentPage,
	selectTotalPage,
} from '../store/pagination/selector';
import { WindowWidth } from '../types';
import districes from '../localData/taiwan_districts.json';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGlobalParams = () => {
	const globalKeyWord = useAppSelector(selectKeyWord);
	const globalCity = useAppSelector(selectCity);
	const globalCategory = useAppSelector(selectCategory);
	const busTripName = useAppSelector(selectBusTripName);
	const isBusWayStart = useAppSelector(selectIsBusWayStart);
	const globalLat = useAppSelector(selectLat);
	const globalLng = useAppSelector(selectLng);

	return {
		globalCategory,
		globalCity,
		globalKeyWord,
		busTripName,
		isBusWayStart,
		globalLat,
		globalLng,
	};
};

export const usePagination = () => {
	const currentPage = useAppSelector(selectCurrentPage);
	const totalPage = useAppSelector(selectTotalPage);

	return {
		currentPage,
		totalPage,
	}
};

export const useDistrictToCity = () => {
	console.log(districes);
}

export const useCountDown = (sec: number) => {
	const [countDownTime, setCountDownTime] = useState<number>(sec);
	const [isStart, setIsStart] = useState<boolean>(false);

	const startCountDown: () => void = useCallback(() => setIsStart(true), []);
	const stopCountDown: () => void = useCallback(() => setIsStart(false), []);

	useEffect(() => {
		if (isStart) {
			if (countDownTime === 0) {
				stopCountDown();
				setCountDownTime(sec);
			} else {
				setTimeout(() => setCountDownTime(preCountDownTime => preCountDownTime -= 1), 1000); 
			}
		}
	}, [countDownTime, isStart, stopCountDown]);

	return {
		countDownTime,
		startCountDown,
		stopCountDown,
	}
};

interface Size {
  width: number | undefined;
	isPad: boolean;
	isMobile: boolean;
}

export const useMedia: () => Size = () => {
	const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

	useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowWidth(window.screen.width);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

	const isPad = !!(windowWidth && windowWidth <= WindowWidth.Pad && windowWidth > WindowWidth.Mobile);
	const isMobile = !!(windowWidth && windowWidth <= WindowWidth.Mobile);
	return {
		width: windowWidth,
		isPad,
		isMobile,
	};
}