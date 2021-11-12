import React, { useState } from 'react';

import { TourType } from '../../../types';
import { Select } from '../Select';
import cityList from '../../../localData/city.json';

import bannerTitle from '../../../images/banner/banner-title.png';
import bannerBg from '../../../images/banner/banner-bg.png';
import searchIcon from '../../../images/banner/search.png';
import locationIcon from '../../../images/banner/location.png';

interface Props {
	isMatchTourHotel: boolean;
	isMatchHome: boolean;
	handleChangeCity: (city: string) => void;
	handleChangeCategory: (category: string) => void;
	handleChangeKeyWord: (keyWord: string) => void;
	handleResetPage: () => void;
}

export function Banner(props: Props) {
	const {
		isMatchHome,
		isMatchTourHotel,
		handleChangeCity,
		handleChangeKeyWord,
		handleChangeCategory,
		handleResetPage,
	} = props;
	const [keyWord, setKeyWord] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [category, setCategory] = useState<string>('');

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

	const handleSelectCategory: (value: string) => void = value => setCategory(value);

	const handleSelectCity: (value: string) => void = value => setCity(value);

	const handleSearch = () => {
		handleResetPage();
		handleChangeCategory(category);
		handleChangeCity(city);
		handleChangeKeyWord(keyWord);
	};

	const handleGetPosition = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			const { coords: {latitude, longitude} } = position;
		})
	}
	
	const formatCityList = cityList.map(city => (
		{
			name: city.CityName,
			value: city.City
	}));
	formatCityList.unshift({
		name: '不分縣市',
		value: '',
	})

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
				<div className="search-keyword">
					<input
						placeholder="搜尋關鍵字"
						value={keyWord}
						onChange={handleChangeInputKeyWord}
					/>
					<button onClick={handleGetPosition}>
						<img src={locationIcon} alt="get your current location" />
					</button>
				</div>
				<div className="search-selected">
					<div className="select-group">
						{(isMatchHome || isMatchTourHotel) && (
							<Select 
								list={isMatchHome ? placeCategoryList : hotelCategoryList}
								handleOnChange={handleSelectCategory}
								hint="類別"
							/>
						)}
						<Select list={formatCityList} handleOnChange={handleSelectCity} hint="縣市" />
					</div>
					<button onClick={handleSearch}>
						<img src={searchIcon} alt="search key word" />
					</button>
				</div>
			</div>
		</div>
	);
}