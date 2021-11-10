import { ChangeEvent } from 'react';
import { Outlet, useMatch } from "react-router";

import { Navigation } from "../Navigation";
import { Banner } from "../Banner";
import { useGlobalParams, useAppDispatch } from '../../../helpers';
import {
  changeKeyWord,
  changeSelectCategory,
  changeSelectCity,
} from '../../../store/globalStore';

export function Layout() {
  const isMatchTourHotel = useMatch('/tourHotel');
  const isMatchHome = useMatch('/');
  const dispatch = useAppDispatch();
  const { globalKeyWord } = useGlobalParams();

  const handleChangeKeyWord: (keyWord: string) => void = keyWord => {
    if ((!keyWord && !globalKeyWord) || keyWord === globalKeyWord) {
      return;
    }
    dispatch(changeKeyWord({ keyWord }));
  };

  const handleChangeCity: (
      e: ChangeEvent<HTMLSelectElement>
    ) => void = e => {
      const { value: city } = e.target;
      dispatch(changeSelectCity({ city }));
  }

  const handleChangeCategory: (
      e: ChangeEvent<HTMLSelectElement>
    ) => void = e => {
      const { value: category } = e.target;
      dispatch(changeSelectCategory({ category }));
  }

	return (
    <div className="app">
        <header className="app-header">
          <Navigation />
        </header>
        <Banner 
          isMatchHome={!!isMatchHome} 
          isMatchTourHotel={!!isMatchTourHotel}
          handleChangeCity={handleChangeCity}
          handleChangeKeyWord={handleChangeKeyWord}
          handleChangeCategory={handleChangeCategory}
        />
        <Outlet />
      </div>
  )
};