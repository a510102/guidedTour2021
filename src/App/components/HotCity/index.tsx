import { useState } from 'react';

import titleIcon from '../../../images/global/Vector.svg';
import pre from '../../../images/hotCity/icon/pre.png';
import next from '../../../images/hotCity/icon/next.png';
import map from '../../../images/hotCity/icon/map_M.svg';

interface Props {
	handleChangeCity: (city: string) => void;
}

enum CityPage {
	PageOne = 1,
	PageTwo = 2,
	limit = 7,
};

export function HotCity(props: Props) {
	const { handleChangeCity } = props;
	const [cityPage, setCityPage] = useState<number>(CityPage.PageOne);
	const cityList = [
		{name: '台北市', value: 'Taipei'},
		{name: '新北市', value: 'NewTaipei'},
		{name: '桃園市', value: 'Taoyuan'},
		{name: '新竹市', value: 'HsinchuCounty'},
		{name: '台中', value: 'Taichung'},
		{name: '南投', value: 'NantouCounty'},
		{name: '嘉義', value: 'Chiayi'},
		{name: '台南', value: 'Tainan'},
		{name: '高雄', value: 'Kaohsiung'},
		{name: '屏東', value: 'PingtungCounty'},
		{name: '宜蘭', value: 'YilanCounty'},
		{name: '花蓮', value: 'HualienCounty'},
		{name: '台東', value: 'TaitungCounty'},
		{name: '澎湖', value: 'PenghuCounty'},
	];
	const handlePrePage = () => setCityPage(CityPage.PageOne);
	const handleNextPage = () => setCityPage(CityPage.PageTwo);

	return (
		<div className="hot-city">
			<h4>
				<img src={titleIcon} alt="icon" />
				<span>熱門城市</span>
			</h4>
			<div className="select-hot-city">
				{cityPage === CityPage.PageTwo && <button
					className="select-hot-city-btn pre"
					onClick={handlePrePage}
				>
					<img src={pre} alt="icon" />
				</button>}
				{
					cityList.map((city, index) => (
						(index < CityPage.limit * cityPage) && 
						(index >= CityPage.limit * (cityPage - 1))
					) ? ( 
						<div
							key={index}
							className="hot-city-item"
							onClick={() => handleChangeCity(city.value)}
						>
							<img
								className="item-bg" 
								src={require(`../../../images/hotCity/city/${city.value}.png`).default} alt="pic" 
							/>
							<p>
								<img src={map} alt="icon" />
								<span>{city.name}</span>
							</p>
						</div>
					) : null)
				}
				{cityPage === CityPage.PageOne &&<button
					className="select-hot-city-btn next"
					onClick={handleNextPage}
				>
					<img src={next} alt="icon" />
				</button>}
			</div>
		</div>
	);
};