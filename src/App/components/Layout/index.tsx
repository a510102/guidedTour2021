import { Outlet, useMatch } from "react-router";

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
  const { globalKeyWord, globalCategory, globalCity } = useGlobalParams();

  const handleChangeKeyWord: (keyWord: string) => void = keyWord => {
    if ((!keyWord && !globalKeyWord) || keyWord === globalKeyWord) {
      return;
    }
    dispatch(changeKeyWord({ keyWord }));
  };

  const handleChangeCity: (city: string) => void = city => {
      if (city === globalCity) {
        return;
      }
      dispatch(changeSelectCity({ city }));
  };

  const handleChangeCategory: (category: string) => void = category => {
      if (category === globalCategory) {
        return;
      }
      dispatch(changeSelectCategory({ category }));
  };

  const handleResetPage: () => void = () => {
    dispatch(resetPage());
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
          handleResetPage={handleResetPage}
        />
        <Outlet />
        <Footer />
      </div>
  )
};