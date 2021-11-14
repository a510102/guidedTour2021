import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from './components/Layout';
import { TourScenicSpotAndActivity } from './pages/TourScenicSpotAndActivity/Loadable';
import { TourHotelAndrestaurant } from './pages/TourHotelAndrestaurant/Loadable';
import { TourTraffic } from './pages/TourTraffic/Loadable';
import { NotFound } from './pages/NotFound/Loadable';
import { store } from '../store';

function App() {
  return (
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
  );
}

export default App;
