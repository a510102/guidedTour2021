import { ActivityCard } from '../../components/ActivityCard';
import { TourActivityType } from "../../slice/type";

import titleIcon from '../../../../../images/global/Vector.svg';

interface Props {
	filterTourActivityList: TourActivityType[];
}

export function TourActivity(props: Props) {
	const { filterTourActivityList } = props;
	return (
		<div className="tour-activity">
			<h4><img src={titleIcon} alt="title icon" />熱門活動</h4>
			<div className="activity-card-list">
				{filterTourActivityList.length > 0 && filterTourActivityList.map((activity, index) => (
					<ActivityCard activity={activity} key={index} />
				)) }
			</div>
		</div>
	);
};
