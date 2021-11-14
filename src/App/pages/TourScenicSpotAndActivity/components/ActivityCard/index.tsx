import { useState } from 'react';

import { TourActivityType } from "../../slice/type";
import { ActivityCardDetailCard } from '../ActivityCardDetailCard';
import { useMedia } from '../../../../../helpers';

import mapIcon from '../../../../../images/activityDetailCard/map_M.svg';
import noImage from '../../../../../images/activityDetailCard/activityNoImage.png';
import noImageSmall from '../../../../../images/activityDetailCard/activityNoImage-small.png';

interface Props {
  activity: TourActivityType;
}

export function ActivityCard(props: Props) {
  const { activity } = props;
  const { isMobile, isPad } = useMedia();
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const handleOpen = () => setIsShowDetail(true);
  const handleClose = () => setIsShowDetail(false);
  const {
    Name, 
    Picture: { PictureUrl1 },
    Description,
    DescriptionDetail,
    Location,
  } = activity;
  const emptyInfo = '- -';
  console.log(isMobile, isPad)
  
  return (
    <>
    <div
      className="activity-card" 
      onClick={() => {
        if (isMobile || isPad) {
          handleOpen();
        }
      }}
    >
      <div className="card-img">
        <img src={PictureUrl1 ? PictureUrl1 : ((isMobile || isPad) ? noImageSmall : noImage)} alt="pic" />
      </div>
      <div className="card-content">
        <h6>{Name}</h6>
        {!(isMobile || isPad) && (
          <p className="card-description">{Description || DescriptionDetail}</p>
        )}
        <div className="card-other-info">
          <p className="card-map">
            <img src={mapIcon} alt="map icon" />
            <span>{Location || emptyInfo}</span>
          </p>
          {!(isMobile || isPad) && (
            <button className="card-btn" onClick={handleOpen}>活動詳情</button>
          )}
        </div>
      </div>
    </div>
    {isShowDetail && (
      <ActivityCardDetailCard 
        activity={activity} 
        handleClose={handleClose} 
      />
    )}
    </>
  );
};
