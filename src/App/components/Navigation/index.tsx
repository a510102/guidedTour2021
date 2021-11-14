import { NavLink, Link } from 'react-router-dom';


import { useMedia } from '../../../helpers';

import tourIcon from '../../../images/navigation/tourIcon.svg';
import foodIcon from '../../../images/navigation/foodIcon.svg';
import trafficIcon from '../../../images/navigation/trafficIcon.svg'
import logo from '../../../images/navigation/logo.png';

export function Navigation() {
	const { isMobile } = useMedia();

	return (
		<nav className="header-nav">
			{!isMobile && (
				<h1 className="header-logo">
					<Link to='/'>
						<img src={logo} alt='taiwan tourism site' />
					</Link>
				</h1>
			)}
			<div className="header-links">
				<NavLink className="header-link tour" to='/'>
					{!isMobile && <img src={tourIcon} alt='' />}台灣景點
				</NavLink>
				<NavLink className="header-link hotel" to='tourHotel'>
					{!isMobile && <img src={foodIcon} alt='' />}美食住宿
				</NavLink>
				<NavLink className="header-link traffic" to='tourTraffic'>
					{!isMobile && <img src={trafficIcon} alt='' />}景點交通
				</NavLink>
			</div>
		</nav>
	)
}