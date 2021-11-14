import { Card } from "../../../../components/Card";
import { TourHotelProps } from "../../slice/type";
import districts from '../../../../../localData/taiwan_districts.json';

import titleIcon from '../../../../../images/global/Vector.svg';

interface Props {
	filterTourHotelList: TourHotelProps[];
	globalCiry: string;
}

export function TourHotel(props: Props) {
	const { filterTourHotelList, globalCiry } = props;

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
		<div className="tour-hotel">
			<h4><img src={titleIcon} alt="icon" /> 熱門飯店</h4>
			<div className="card-list">
				{
					filterTourHotelList.length > 0 && (
						filterTourHotelList.map((hotel, index) => (
							<Card
								key={index}
								imgUrl={hotel.Picture.PictureUrl1} 
								cardTitle={hotel.Name} 
								cardPosition={getPosition(hotel.ZipCode, hotel.City)} 
							/>
						))
					)
				}	
			</div>
		</div>
	);
};