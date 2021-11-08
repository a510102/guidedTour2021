/* eslint-disable no-fallthrough */
import { createContext, useReducer, ReactNode, FC } from 'react';

enum StoreAction {
	ChangeKeyWorld = 'CHANGE_STORE_KEY_WORD',
	ChangeCity = 'CHANGE_STORE_CITY',
	ChangeCategory = 'CHANGE_STORE_CATEGORY',
}

type StoreType = {
	keyWord: string;
	selectedCity: string;
	selectedCategory: string;
}

const initialStore: StoreType = {
	keyWord: '',
	selectedCity: '',
	selectedCategory: '',
};

const StoreContext = createContext<{state: StoreType; dispatch: any}>({
	state: initialStore,
	dispatch: null,
});

const storeReduce = (
	state: StoreType, 
	action: { type: string, payload: any}
) => {
	switch (action.type) {
		case StoreAction.ChangeKeyWorld:
			return {...state, keyWord: action.payload};
		case StoreAction.ChangeCity:
			return {...state, selectedCity: action.payload};
		case StoreAction.ChangeCategory:
			return {...state, selectedCategory: action.payload};
		default:
			return state;
	};
};

interface StoreProviderProps {
	children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({children}) =>　{
	const [state, dispatch] = useReducer(storeReduce, initialStore);
	return (
		<StoreContext.Provider value={{state, dispatch}}>
			{children}
		</StoreContext.Provider>
	);
};

export {
	StoreContext,
	StoreProvider,
	StoreAction,
};