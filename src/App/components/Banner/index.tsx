import React, { useState, ChangeEvent } from 'react';

import cityList from '../../../localData/city.json';

import bannerTitle from '../../../images/banner/banner-title.png';
import bannerBg from '../../../images/banner/banner-bg.png';
import searchIcon from '../../../images/banner/search.png';
import locationIcon from '../../../images/banner/location.png';
import { TourType } from '../../../types';

interface Props {
	isMatchTourHotel: boolean;
	isMatchHome: boolean;
	handleChangeCity: (
		e: ChangeEvent<HTMLSelectElement>
	) => void;
	handleChangeCategory: (
		e: ChangeEvent<HTMLSelectElement>
	) => void;
	handleChangeKeyWord: (keyWord: string) => void;
}

export function Banner(props: Props) {
	const {
		isMatchHome,
		isMatchTourHotel,
		handleChangeCity,
		handleChangeKeyWord,
		handleChangeCategory,
	} = props;
	const [keyWord, setKeyWord] = useState<string>('');
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

	const handleChangeInputKeyWord : (e: React.ChangeEvent<HTMLInputElement
		>) => void = e => {
			const { value } = e.target;
			setKeyWord(value);
	};

	const searchDataByKeyWord: () => void = () => {
		handleChangeKeyWord(keyWord);
	};

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
					<input
						placeholder="搜尋關鍵字"
						value={keyWord}
						onChange={handleChangeInputKeyWord}
					/>
					<button onClick={searchDataByKeyWord}>
						<img src={searchIcon} alt="search key word" />
					</button>
				</div>
				<div>
					{(isMatchHome || isMatchTourHotel) && (
						<select onChange={handleChangeCategory}>
							<option value="">類別</option>
							{
								(isMatchHome ? placeCategoryList : hotelCategoryList).map((category, i) => (
									<option key={i} value={category.value}>{category.name}</option>
								)) 
							}
						</select>
					)}
					<select onChange={handleChangeCity}>
						<option value="">不分縣市</option>
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