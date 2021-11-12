import mapIcon from '../../../images/card/map.svg';
import noImage from '../../../images/card/cardNoImage.png';

interface Props {
	imgUrl: string;
	cardTitle: string;
	cardPosition: string;
}

export function Card(props: Props) {
	const { imgUrl, cardTitle, cardPosition } = props;

	return (
		<div className="card">
			<div className="card-img">
				<img src={imgUrl || noImage} alt="card pic" />
			</div>
			<p>{cardTitle}</p>
			<div className="card-position">
				<img src={mapIcon} alt="map icon" />
				<span>{cardPosition}</span>
			</div>
		</div>
	);
}