import { TourActivityType } from "../../slice/type";

interface Props {
  activity: TourActivityType;
}

export function ActivtyCard(props: Props) {
  const { activity } = props;
  return (
    <div className="activity-card">
      <div>
        <img src={activity.Picture.PictureUrl1} alt="pic" />
      </div>
      <div>
        <h6>{activity.Name}</h6>
        <p>{activity.Description}</p>
        <div>
          <p>{activity.Address}</p>
          <div>活動內容</div>
        </div>
      </div>
    </div>
  );
};
