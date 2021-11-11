import { Card } from '../../../../components/Card';
import { TourActivityType } from "../../slice/type";

import titleIcon from '../../../../../images/card/card-title.svg';

interface Props {
	filterTourActivityList: TourActivityType[];
}

export function TourActivity(props: Props) {
	const { filterTourActivityList } = props;
	return (
		<div className="tour-activity">
			<h4><img src={titleIcon} alt="title icon" />熱門活動</h4>
			<div className="card-list">
				{filterTourActivityList.length > 0 && filterTourActivityList.map((activity, index) => (
					<Card
						key={index}
						imgUrl={activity.Picture.PictureUrl1} 
						cardTitle={activity.Name} 
						cardPosition={activity.Address || '- -'} 
					/>
				)) }
			</div>
		</div>
	);
};
