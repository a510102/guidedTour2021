import { ScenicSpotCard } from '../../components/ScenicSpotCard';
import { TourPlaceType } from "../../slice/type";

import titleIcon from '../../../../../images/global/Vector.svg';

interface Props {
	filterTourScenicSpotList: TourPlaceType[];
}

export function TourScenicSpot(props: Props) {
	const { filterTourScenicSpotList } = props;
	return (
		<div className="tour-scenic-spot">
			<h4><img src={titleIcon} alt="icon" /> 熱門景點</h4>
			<div className="scenic-spot-card-list">
				{
					filterTourScenicSpotList.length > 0 && (
						filterTourScenicSpotList.map((scenicSpot, index) => (
							<ScenicSpotCard activity={scenicSpot} key={index} />
						))
					)
				}	
			</div>
		</div>
	);
};