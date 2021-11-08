import { NavLink } from 'react-router-dom';

import tourIcon from '../../../images/navigation/tourIcon.svg';
import foodIcon from '../../../images/navigation/foodIcon.svg';
import trafficIcon from '../../../images/navigation/trafficIcon.svg'
import logo from '../../../images/navigation/logo.png';

export function Navigation() {
	return (
		<nav className="header-nav">
			<h1 className="header-logo">
				<img src={logo} alt='taiwan tourism site' />
			</h1>
			<div className="header-links">
				<NavLink className="header-link tour" to='/'><img src={tourIcon} alt='' />台灣景點</NavLink>
				<NavLink className="header-link hotel" to='tourHotel'><img src={foodIcon} alt='' />美食住宿</NavLink>
				<NavLink className="header-link traffic" to='tourTraffic'><img src={trafficIcon} alt='' />景點交通</NavLink>
			</div>
		</nav>
	)
}