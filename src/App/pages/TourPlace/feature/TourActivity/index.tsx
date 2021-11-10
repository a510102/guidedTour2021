import { TourActivityType } from "../../slice/type";

interface Props {
	filterTourActivityList: TourActivityType[];
}

export function TourActivity(props: Props) {
	return (
		<div>
			<h4>熱門活動</h4>
		</div>
	);
};
