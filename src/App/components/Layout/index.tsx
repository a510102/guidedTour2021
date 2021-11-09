import React from 'react';
import { Outlet, useMatch } from "react-router";

import { Navigation } from "../Navigation";
import { Banner } from "../Banner";
import { useAppDispatch, useAppSelector } from '../../../helpers';
import {
  changeKeyWord,
  changeSelectCategory,
  changeSelectCity,
} from '../../../store/globalStore';
import { selectKeyWord } from '../../../store/globalStore/selector';
 
export function Layout() {
  const dispatch = useAppDispatch();
  const isMatchTourHotel = useMatch('/tourHotel');
  const isMatchHome = useMatch('/');
  const globalKeyWord = useAppSelector(selectKeyWord);

  const handleChangeKeyWord: (keyWord: string) => void = keyWord => {
    if (!keyWord && !globalKeyWord) {
      return;
    }
    if (keyWord === globalKeyWord) {
      return;
    }
    dispatch(changeKeyWord({keyWord}));
  };

  const handleChangeCity: (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => void = e => {
    const { value: city } = e.target;
    dispatch(changeSelectCity({ city }));
  };

  const handleChangeCategory: (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => void = e => {
    const { value: category } = e.target;
    dispatch(changeSelectCategory({ category })); 
  };

	return (
    <div className="app">
        <header className="app-header">
          <Navigation />
        </header>
        <Banner 
          isMatchHome={!!isMatchHome} 
          isMatchTourHotel={!!isMatchTourHotel}
          handleChangeCity={handleChangeCity}
          handleChangeCategory={handleChangeCategory}
          handleChangeKeyWord={handleChangeKeyWord}
        />
        <Outlet />
      </div>
  )
};