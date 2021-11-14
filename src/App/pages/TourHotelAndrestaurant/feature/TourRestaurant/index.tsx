import { Card } from "../../../../components/Card";
import { TourRestaurantProps } from "../../slice/type";
import districts from '../../../../../localData/taiwan_districts.json';

import titleIcon from '../../../../../images/card/card-title.svg';

interface Props {
	filterTourRestaurantList: TourRestaurantProps[];
	globalCiry: string;
}

export function TourRestaurant(props: Props) {
	const { filterTourRestaurantList, globalCiry } = props;

	const getPosition: (zipCode: string | undefined, city: string | undefined) => string = (zipCode, city) => {
		const emptyInfo: string = '- -';
		let currentPosition: string;
		const zipCodeFormat = zipCode ? zipCode.substring(0, 3) : '';
		if (!zipCode) {
			currentPosition = city || globalCiry || emptyInfo;
		} else {
			const zips = districts.filter(district => district.name === city?.replace('台', '臺'));
			
			const zip = zips.length > 0 ? zips[0].districts.find(district => district.zip === zipCodeFormat) : null;
			const formatPosition = zip ? `${zips[0].name} ${zip.name}` : '';
			currentPosition = formatPosition || city || emptyInfo
		}
		
		return currentPosition
	};

	return (
		<div className="tour-restaurant">
			<h4><img src={titleIcon} alt="icon" /> 熱門景點</h4>
			<div className="card-list">
				{
					filterTourRestaurantList.length > 0 && (
						filterTourRestaurantList.map((restaurant, index) => (
							<Card
								key={index}
								imgUrl={restaurant.Picture.PictureUrl1} 
								cardTitle={restaurant.Name} 
								cardPosition={getPosition(restaurant.ZipCode, restaurant.City)} 
							/>
						))
					)
				}	
			</div>
		</div>
	);
};