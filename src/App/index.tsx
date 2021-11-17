import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import { Layout } from './components/Layout';
import { TourScenicSpotAndActivity } from './pages/TourScenicSpotAndActivity/Loadable';
import { TourHotelAndrestaurant } from './pages/TourHotelAndrestaurant/Loadable';
import { TourTraffic } from './pages/TourTraffic/Loadable';
import { NotFound } from './pages/NotFound/Loadable';
import { store } from '../store';

function App() {
  const countViewHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    countViewHeight();
    window.addEventListener('resize', () => countViewHeight());

    return () => {
      window.removeEventListener('resize', () => countViewHeight());
    }
  }, []);
  return (
    <HelmetProvider>
      <Helmet
        defaultTitle="Taiwan Trip"
      >
        <meta name="description" content="taiwan trip" />
      </Helmet>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<TourScenicSpotAndActivity />} />
              <Route path='tourHotel' element={<TourHotelAndrestaurant />} />
              <Route path='tourTraffic' element={<TourTraffic />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
