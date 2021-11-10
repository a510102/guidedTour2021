import { Card } from "../../../../components/Card";
import { TourPlaceType } from "../../slice/type";

interface Props {
	filterTourScenicSpotList: TourPlaceType[];
}

export function TourScenicSpot(props: Props) {
	const { filterTourScenicSpotList } = props;
	return (
		<div>
			<h4>熱門景點</h4>
			{filterTourScenicSpotList.length > 0 && filterTourScenicSpotList.map((scenicSpot, index) => (
				<Card imgUrl={scenicSpot.Picture.PictureUrl1} cardTitle={scenicSpot.Name} cardPosition={`${scenicSpot.City || ''} ${scenicSpot.Address || ''}`} />
			)) }
		</div>
	);
};