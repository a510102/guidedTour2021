import { useState } from 'react';

import { TourPlaceType } from "../../slice/type";
import { ScenicSpotDetailCard } from '../ScenicSpotDetailCard';

import mapIcon from '../../../../../images/scenicSpotDetailCard/map_M.svg'

interface Props {
  activity: TourPlaceType;
}

export function ScenicSpotCard(props: Props) {
  const { activity } = props;
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const handleOpen = () => setIsShowDetail(true);
  const handleClose = () => setIsShowDetail(false);
  const {
    Name, 
    Picture: { PictureUrl1 },
    Description,
    Address,
  } = activity;
  const emptyInfo = '- -';
  
  return (
    <>
    <div className="scenic-spot-card">
      <div className="card-img">
        {PictureUrl1 && <img src={PictureUrl1} alt="pic" />}
      </div>
      <div className="card-content">
        <h6>{Name}</h6>
        <p className="card-description">{Description}</p>
        <div className="card-other-info">
          <p className="card-map">
            <img src={mapIcon} alt="map icon" />
            <span>{Address || emptyInfo}</span>
          </p>
          <button className="card-btn" onClick={handleOpen}>活動詳情</button>
        </div>
      </div>
    </div>
    {isShowDetail && (
      <ScenicSpotDetailCard 
        activity={activity} 
        handleClose={handleClose} 
      />
    )}
    </>
  );
};
