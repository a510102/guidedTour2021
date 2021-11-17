import { useState, useEffect } from 'react';

import { TourActivityType } from "../../slice/type";

import preIcon from '../../../../../images/hotCity/icon/pre.png';
import nextIcon from '../../../../../images/hotCity/icon/next.png';
import ticketIcon from '../../../../../images/activityDetailCard/ticket.svg';
import timeIcon from '../../../../../images/activityDetailCard/time.svg';
import mapIcon from '../../../../../images/activityDetailCard/map_M.svg';
import phoneIcon from '../../../../../images/activityDetailCard/tel.svg';
import closeIcon from '../../../../../images/global/close.png';
import noImage from '../../../../../images/activityDetailCard/activityDetailNoImage.png';

interface Props {
	activity: TourActivityType;
	handleClose: () => void;
};

export function ActivityCardDetailCard(props: Props) {
	const { activity, handleClose } = props;
	const [pictureIndex, setPictureIndex] = useState<number>(0);
	const {
		Picture: {
			PictureUrl1,
			PictureUrl2,
			PictureUrl3
		},
		StartTime,
		EndTime,
		Charge,
		Location,
		Address,
		Phone,
		Name,
		DescriptionDetail,
		Description,
	} = activity;

	const getPictureList: () => string[] = () => {
		const list = [];
		if (PictureUrl1) {
			list.push(PictureUrl1);
		}
		if (PictureUrl2) {
			list.push(PictureUrl2);
		}
		if (PictureUrl3) {
			list.push(PictureUrl3);
		}
		return list;
	}

	const getTimeFormat: (timeStamp: string) => string = timeStamp => {
		const time = new Date(timeStamp);
		const year = time.getFullYear();
		const month = time.getMonth() + 1;
		const day = time.getDate();
		const formateTime = `${year}-${month}-${day}`;
		return formateTime;
	}
	
	const pictureList: string[] = getPictureList();
	const emptyInfo = '- -'
	const otherInfo = [
		{
			icon: timeIcon,
			name: `${getTimeFormat(StartTime)} ~ ${getTimeFormat(EndTime)}` || emptyInfo,
			className: 'time',
		},
		{
			icon: ticketIcon,
			name: Charge || emptyInfo,
			className: 'ticket',
		},
		{
			icon: mapIcon,
			name: `${Location.replace(' ', '')}${Address}` || emptyInfo,
			className: 'map',
		},
		{
			icon: phoneIcon,
			name: Phone || emptyInfo,
			className: 'phone',
		},
	];

	const prePicture = () => setPictureIndex(prePictureIndex => prePictureIndex -= 1);

	const nextPicture = () => setPictureIndex(prePictureIndex => prePictureIndex += 1);


	useEffect(() => {
		document.documentElement.classList.add('fixed');

		return () => {
			document.documentElement.classList.remove('fixed');
		}
	}, []);

	return (
		<div className="OpenTime-wrap">
			<div className="OpenTimed" onClick={handleClose}>
				<div className="card-container" onClick={e => e.stopPropagation()}>
					<button className="close-btn" onClick={handleClose}>
						<img src={closeIcon} alt="close detail card" />
					</button>
					<div className="scenic-spot-pic">
						<img src={pictureList.length === 0 ? noImage : pictureList[pictureIndex]} alt="activity pic" />
						{pictureList.length > 1 && (
							<div className="choose-pic">
								<button disabled={pictureIndex === 0} onClick={prePicture}>
									<img src={preIcon} alt="pre pic" />
								</button>
								<button disabled={pictureIndex === pictureList.length -1} onClick={nextPicture}>
									<img src={nextIcon} alt="next pic" />
								</button>
							</div>
						)}
					</div>
				</div>
				<h4>{Name}</h4>
				<p>{Description || DescriptionDetail}</p>
				<div className="other-info">
						{
							otherInfo.map((info, index) => (
								<div className={info.className} key={index}>
									<img src={info.icon} alt={info.className} />
									<span>{info.name}</span>
								</div>
							))
						}
				</div>
			</div>
		</div>
	);
};
