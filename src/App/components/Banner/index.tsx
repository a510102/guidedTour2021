import { useContext } from 'react';

import { StoreAction, StoreContext } from '../../../store/Global';
import cityList from '../../../localData/city.json';

import bannerTitle from '../../../images/banner/banner-title.png';
import bannerBg from '../../../images/banner/banner-bg.png';
import searchIcon from '../../../images/banner/search.png';
import locationIcon from '../../../images/banner/location.png';
import { TourType } from '../../../types';

interface Props {
	isMatchTourHotel: boolean;
	isMatchHome: boolean;
}

export function Banner(props: Props) {
	const { isMatchHome, isMatchTourHotel } = props;
	const { state, dispatch } = useContext(StoreContext);

	const placeCategoryList = [
		{
			name: '景點',
			value: TourType.TourPlace,

		},
		{
			name: '活動',
			value: TourType.TourActive,
		},
	];
	const hotelCategoryList = [
		{
			name: '美食',
			value: TourType.TourFood,
		},
		{
			name: '住宿',
			value: TourType.TourHotel,
		},
	];

	const handleChangeCategory: (category: string) => void = category => {

	}

	return (
		<div 
			className="banner"
			style={{
				background: `url(${bannerBg}) no-repeat center center`,
				backgroundColor: '#fff',
			}}
		>
			<div className="banner-search">
				<img src={bannerTitle} alt="search key word" />
				<p className="search-tip">台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
				<div>
					<input placeholder="搜尋關鍵字" />
					<button>
						<img src={searchIcon} alt="search key word" />
					</button>
				</div>
				<div>
					{(isMatchHome || isMatchTourHotel) && (
						<select onChange={handleChangeCategory}>
							<option value="">類別</option>
							{
								(isMatchHome ? placeCategoryList : hotelCategoryList).map(category => (
									<option value={category.value}>{category.name}</option>
								)) 
							}
						</select>
					)}
					<select>
						<option>不分縣市</option>
						{cityList.map(city => (
							<option 
								key={city.CityCode} 
								value={city.City}
							>{city.CityName}</option>
						))}
					</select>
					<button>
						<img src={locationIcon} alt="get your current location" />
					</button>
				</div>
			</div>
		</div>
	);
}