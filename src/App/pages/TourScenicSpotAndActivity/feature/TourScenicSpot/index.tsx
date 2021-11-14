import { Card } from "../../../../components/Card";
import { TourPlaceType } from "../../slice/type";
import districts from '../../../../../localData/taiwan_districts.json';

import titleIcon from '../../../../../images/global/Vector.svg';

interface Props {
	filterTourScenicSpotList: TourPlaceType[];
	globalCiry: string;
}

export function TourScenicSpot(props: Props) {
	const { filterTourScenicSpotList, globalCiry } = props;

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
		<div className="tour-scenic-spot">
			<h4><img src={titleIcon} alt="icon" /> 熱門景點</h4>
			<div className="card-list">
				{
					filterTourScenicSpotList.length > 0 && (
						filterTourScenicSpotList.map((scenicSpot, index) => (
							<Card
								key={index}
								imgUrl={scenicSpot.Picture.PictureUrl1} 
								cardTitle={scenicSpot.Name} 
								cardPosition={getPosition(scenicSpot.ZipCode, scenicSpot.City)} 
							/>
						))
					)
				}	
			</div>
		</div>
	);
};