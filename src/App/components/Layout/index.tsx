import { useEffect, useCallback } from 'react';
import { Outlet, useMatch, useLocation } from "react-router";

import { Navigation } from "../Navigation";
import { Banner } from "../Banner";
import { Footer } from '../Footer';
import { 
  useGlobalParams, 
  useAppDispatch, 
  useAppSelector,
} from '../../../helpers';
import {
  changeBusTripName,
  changeKeyWord,
  changeSelectCategory,
  changeSelectCity,
  toggleIsBusWayStart,
  changeLatLng,
} from '../../../store/globalStore';
import { resetPage } from "../../../store/pagination";
import { selectBusStop } from '../../pages/TourTraffic/slice/selector';

export function Layout() {
  const isMatchTourHotel = useMatch('/tourHotel');
  const isMatchHome = useMatch('/');
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const {
    globalKeyWord,
    globalCategory,
    globalCity,
    busTripName,
    isBusWayStart,
    globalLat,
    globalLng,
  } = useGlobalParams();
  const busStop = useAppSelector(selectBusStop);

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

  const handleChangeLatLng: (lat: string | number, lng: string | number) => void = useCallback((lat, lng) => {
    if (lat === globalLat && lng === globalLng) {
      return;
    }
    dispatch(changeLatLng({ lat, lng }));
  }, [dispatch, globalLng, globalLat]);

  const handleResetPage: () => void = useCallback(() => {
    dispatch(resetPage());
  }, [dispatch]);

  const handleToggleIsBusWayStart: (isStart: boolean) => void = useCallback(isStart => {
    if (isStart === isBusWayStart) {
      return;
    }
    dispatch(toggleIsBusWayStart({isStart}))
  }, [isBusWayStart, dispatch]);

  const handleChangeTripName: (tripName: string) => void = useCallback(tripName => {
    if (tripName === busTripName) {
      return;
    }
    dispatch(changeBusTripName({busTripName: tripName}));
  }, [busTripName, dispatch]);

  useEffect(() => {
    handleResetPage();
    handleChangeCategory('');
    handleChangeCity('');
    handleChangeKeyWord('');
    handleToggleIsBusWayStart(true);
    handleChangeTripName('');
    handleChangeLatLng('', '');
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
          busStop={busStop}
          isBusWayStart={isBusWayStart}
          busTripName={busTripName}
          handleToggleIsBusWayStart={handleToggleIsBusWayStart}
          handleChangeTripName={handleChangeTripName}
          handleChangeLatLng={handleChangeLatLng}
        />
        <Outlet />
        <Footer />
      </div>
  )
};