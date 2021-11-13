import { useEffect, useCallback } from 'react';
import { Outlet, useMatch, useLocation } from "react-router";

import { Navigation } from "../Navigation";
import { Banner } from "../Banner";
import { Footer } from '../Footer';
import { useGlobalParams, useAppDispatch } from '../../../helpers';
import {
  changeKeyWord,
  changeSelectCategory,
  changeSelectCity,
} from '../../../store/globalStore';
import { resetPage } from "../../../store/pagination";

export function Layout() {
  const isMatchTourHotel = useMatch('/tourHotel');
  const isMatchHome = useMatch('/');
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { globalKeyWord, globalCategory, globalCity } = useGlobalParams();

  const handleChangeKeyWord: (keyWord: string) => void = useCallback(keyWord => {
    if ((!keyWord && !globalKeyWord) || keyWord === globalKeyWord) {
      return;
    }
    dispatch(changeKeyWord({ keyWord }));
  }, [dispatch, globalKeyWord]);

  const handleChangeCity: (city: string) => void = useCallback(city => {
      if (city === globalCity) {
        return;
      }
      dispatch(changeSelectCity({ city }));
  }, [dispatch, globalCity]);

  const handleChangeCategory: (category: string) => void = useCallback(category => {
      if (category === globalCategory) {
        return;
      }
      dispatch(changeSelectCategory({ category }));
  }, [dispatch, globalCategory]);

  const handleResetPage: () => void = useCallback(() => {
    dispatch(resetPage());
  }, [dispatch]);

  useEffect(() => {
    console.log('run');
    handleResetPage();
    handleChangeCategory('');
    handleChangeCity('');
    handleChangeKeyWord('');
  }, [pathname]);

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
          handleResetPage={handleResetPage}
        />
        <Outlet />
        <Footer />
      </div>
  )
};