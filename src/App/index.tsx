import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { TourPlace } from './pages/TourPlace/Loadable';
import { TourHotel } from './pages/TourHotel/Loadable';
import { TourTraffic } from './pages/TourTraffic/Loadable';
import { NotFound } from './pages/NotFound/Loadable';

function App() {
  return (
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
  );
}

const Layout = () => {
  return (
    <div className="App">
        <header className="App-header">
          <Navigation />
        </header>
        <Outlet />
      </div>
  )
}

export default App;
