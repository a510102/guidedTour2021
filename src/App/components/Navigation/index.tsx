import { Link } from 'react-router-dom';

export function Navigation() {
	return (
		<nav>
			<Link to='/'>TourPlace</Link>
			<Link to='tourHotel'>TourHotel</Link>
			<Link to='tourTraffic'>TourTraffic</Link>
		</nav>
	)
}