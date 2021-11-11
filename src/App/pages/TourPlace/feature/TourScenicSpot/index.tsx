import { Card } from "../../../../components/Card";
import { TourPlaceType } from "../../slice/type";

import titleIcon from '../../../../../images/card/card-title.svg';

interface Props {
	filterTourScenicSpotList: TourPlaceType[];
}

export function TourScenicSpot(props: Props) {
	const { filterTourScenicSpotList } = props;
	return (
		<div className="tour-scenic-spot">
			<h4><img src={titleIcon} alt="icon" /> 熱門景點</h4>
			<div className="card-list">
				{filterTourScenicSpotList.length > 0 && filterTourScenicSpotList.map((scenicSpot, index) => (
					<Card
						key={index}
						imgUrl={scenicSpot.Picture.PictureUrl1} 
						cardTitle={scenicSpot.Name} 
						cardPosition={`${scenicSpot.City || ''} ${scenicSpot.Address || ''}`} 
					/>
				)) }
			</div>
		</div>
	);
};