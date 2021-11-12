import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
	selectCategory,
	selectCity,
	selectKeyWord, 
} from '../store/globalStore/selector';
import {
	selectCurrentPage,
	selectTotalPage,
} from '../store/pagination/selector';
import districes from '../localData/taiwan_districts.json';

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
