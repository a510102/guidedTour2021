import mapIcon from '../../../images/card/map.svg';

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
				{imgUrl && <img src={imgUrl} alt="card pic" />}
			</div>
			<p>{cardTitle}</p>
			<div className="card-position">
				<img src={mapIcon} alt="map icon" />
				<span>{cardPosition}</span>
			</div>
		</div>
	);
}