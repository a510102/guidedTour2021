import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
	selectCategory,
	selectCity,
	selectKeyWord, 
} from '../store/globalStore/selector';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGlobalParams = () => {
	const globalKeyWord = useAppSelector(selectKeyWord);
	const globalCity = useAppSelector(selectCity);
	const globalCategory = useAppSelector(selectCategory);

	return {
		globalCategory,
		globalCity,
		globalKeyWord,
	};
};
