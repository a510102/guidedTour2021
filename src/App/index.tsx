import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from './components/Layout';
import { TourPlace } from './pages/TourPlace/Loadable';
import { TourHotel } from './pages/TourHotel/Loadable';
import { TourTraffic } from './pages/TourTraffic/Loadable';
import { NotFound } from './pages/NotFound/Loadable';
import { store } from '../store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<TourPlace />} />
            <Route path='tourHotel' element={<TourHotel />} />
            <Route path='tourTraffic' element={<TourTraffic />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
