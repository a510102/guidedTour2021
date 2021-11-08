import { Outlet, useMatch } from "react-router";

import { Navigation } from "../Navigation";
import { Banner } from "../Banner";

export function Layout() {
  const isMatchTourHotel = useMatch('/tourHotel');
  const isMatchHome = useMatch('/');
	return (
    <div className="app">
        <header className="app-header">
          <Navigation />
        </header>
        <Banner 
          isMatchHome={!!isMatchHome} 
          isMatchTourHotel={!!isMatchTourHotel} 
        />
        <Outlet />
      </div>
  )
};