import { useState, useEffect } from 'react';

import { TourPlaceType } from "../../slice/type";

import preIcon from '../../../../../images/hotCity/icon/pre.png';
import nextIcon from '../../../../../images/hotCity/icon/next.png';
import ticketIcon from '../../../../../images/scenicSpotDetailCard/ticket.svg';
import timeIcon from '../../../../../images/scenicSpotDetailCard/time.svg';
import mapIcon from '../../../../../images/scenicSpotDetailCard/map_M.svg';
import phoneIcon from '../../../../../images/scenicSpotDetailCard/tel.svg';
import closeIcon from '../../../../../images/global/close.png';


interface Props {
	activity: TourPlaceType;
	handleClose: () => void;
};

export function ScenicSpotDetailCard(props: Props) {
	const { activity, handleClose } = props;
	const [pictureIndex, setPiceturIndex] = useState<number>(0);
	const {
		Picture: {
			PictureUrl1,
			PictureUrl2,
			PictureUrl3
		},
		OpenTime,
		TicketInfo,
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

	const pictureList: string[] = getPictureList();
	const emptyInfo = '- -'
	const otherInfo = [
		{
			icon: timeIcon,
			name: OpenTime || emptyInfo,
			className: 'time',
		},
		{
			icon: ticketIcon,
			name: TicketInfo || emptyInfo,
			className: 'ticket',
		},
		{
			icon: mapIcon,
			name: Address || emptyInfo,
			className: 'map',
		},
		{
			icon: phoneIcon,
			name: Phone || emptyInfo,
			className: 'phone',
		},
	];

	useEffect(() => {
		document.documentElement.classList.add('fixed');

		return () => {
			document.documentElement.classList.remove('fixed');
		}
	}, []);

	return (
		<div className="scenic-spot-detail-card-wrap">
			<div className="scenic-spot-detail-card" onClick={handleClose}>
				<div className="card-container" onClick={e => e.stopPropagation()}>
					<button className="close-btn" onClick={handleClose}>
						<img src={closeIcon} alt="close detail card" />
					</button>
					<div className="scenic-spot-pic">
						{
							pictureList.length > 0 && (
							<img src={pictureList[pictureIndex]} alt="activity pic" />
						)}
						{pictureIndex > 1 && (
							<div className="choose-pic">
								<button disabled={pictureIndex > 0}>
									<img src={preIcon} alt="pre pic" />
								</button>
								<button disabled={pictureIndex < pictureList.length}>
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
