import { ActivtyCard } from "../../components/ActivityCard";
import { TourActivityType } from "../../slice/type";

interface Props {
	filterTourActivityList: TourActivityType[];
}

export function TourActivity(props: Props) {
	const { filterTourActivityList } = props;
	return (
		<div>
			<h4>熱門活動</h4>
			<div className="activity-card-list">
				{
					filterTourActivityList.length > 0 && (
						filterTourActivityList.map((activity, index) => (
							<ActivtyCard activity={activity} key={index} />
						))
					)
				}	
			</div>
		</div>
	);
};
