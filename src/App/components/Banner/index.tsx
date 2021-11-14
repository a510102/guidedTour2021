import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import { TourType } from '../../../types';
import { Select } from '../Select';
import cityList from '../../../localData/city.json';
import { BuseStopType } from '../../pages/TourTraffic/slice/type';
import { useMedia, useCountDown } from '../../../helpers';

import bannerTitle from '../../../images/banner/banner-title.png';
import bannerBg01 from '../../../images/banner/banner-bg-1.png';
import bannerBg02 from '../../../images/banner/banner-bg-2.png';
import bannerBg03 from '../../../images/banner/banner-bg-3.png';
import searchIcon from '../../../images/banner/search.png';
import locationIcon from '../../../images/banner/location.png';

interface Props {
	isMatchTourHotel: boolean;
	isMatchHome: boolean;
	busStop: BuseStopType[];
	isBusWayStart: boolean;
	busTripName: string;
	handleToggleIsBusWayStart: (isStart: boolean) => void;
	handleChangeTripName: (trip: string) => void;
	handleChangeCity: (city: string) => void;
	handleChangeCategory: (category: string) => void;
	handleChangeKeyWord: (keyWord: string) => void;
	handleResetPage: () => void;
	handleChangeLatLng: (lat: string | number, lng: string | number) => void;
}

export function Banner(props: Props) {
	const {
		isMatchHome,
		isMatchTourHotel,
		busStop,
		isBusWayStart,
		busTripName,
		handleChangeTripName,
		handleToggleIsBusWayStart,
		handleChangeCity,
		handleChangeKeyWord,
		handleChangeCategory,
		handleResetPage,
		handleChangeLatLng,
	} = props;
	const { isPad, isMobile } = useMedia();
	const { startCountDown, stopCountDown, countDownTime } = useCountDown(60)
	const { pathname } = useLocation();
	const [keyWord, setKeyWord] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [tripName, setTripName] = useState<string>('');
	const [bannerImgIndex, setBannerImgIndex] = useState<number>(0);
	const isMatchTraffic = !isMatchHome && !isMatchTourHotel;

	const placeCategoryList = [
		{
			name: '不分類別',
			value: '',
		},
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
			name: '不分類別',
			value: '',
		},
		{
			name: '美食',
			value: TourType.TourFood,
		},
		{
			name: '住宿',
			value: TourType.TourHotel,
		},
	];

	const bannerBgList = [bannerBg01, bannerBg02, bannerBg03];

	const handleChangeInputKeyWord : (e: React.ChangeEvent<HTMLInputElement
		>) => void = e => {
			const { value } = e.target;
			setKeyWord(value);
	};

	const handleSelectCategory: (value: string) => void = value => setCategory(value);

	const handleSelectCity: (value: string) => void = value => setCity(value);

	const handleSelectTripName: (value: string) => void = value => setTripName(value);

	const handleSearch = () => {
		if (isMatchTraffic) {
			handleChangeTripName(tripName)
		} else {
			handleChangeCategory(category);
			handleChangeKeyWord(keyWord);
		}
		handleResetPage();
		handleChangeCity(city);
	};

	const handleGetPosition = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { coords: {latitude, longitude} } = position;
			handleChangeLatLng(latitude, longitude);
		})
	}

	const changeIsBusWayStart:(isStart: boolean) => void = isStart => {
		handleToggleIsBusWayStart(isStart);
	}
	
	const busTripCityList = busStop
		.map(stop => stop.City)
		.filter((ele, index, arr) => arr.indexOf(ele) === index);

	const formatCityList = cityList
		.filter(city => isMatchTraffic ? busTripCityList.includes(city.City) : city)
		.map(city => (
			{
				name: city.CityName,
				value: city.City
	}));
	formatCityList.unshift({
		name: '不分縣市',
		value: '',
	});

	const formatBusStop = busStop
		.filter(stop => city ? stop.City === city : stop)
		.filter(stop => !!stop.TaiwanTripName)
		.map(stop => ({
			name: stop.RouteID,
			value: stop.TaiwanTripName.Zh_tw,
	}));

	const currentBusStop = busStop
		.find((stop, index) => tripName 
			? stop.TaiwanTripName.Zh_tw === tripName 
			: index === 0);

	useEffect(() => {
		setKeyWord('');
	}, [pathname]);

	useEffect(() => {
		startCountDown()

		return () => {
			startCountDown();
		}
	}, []);

	useEffect(() => {
		if (countDownTime === 0) {
			setBannerImgIndex(preBannerImgIndex => preBannerImgIndex === bannerBgList.length - 1 ? 0 : preBannerImgIndex + 1);
			startCountDown();
		}
	}, [countDownTime, bannerBgList]);

	return (
		<div 
			className={`banner ${isMatchTraffic && 'no-bg'}`}
			style={(isMatchTraffic || isPad || isMobile) 
				? {}
				: {
					background: `url(${bannerBgList[bannerImgIndex]}) no-repeat center center #fff`,
			}}
		>
			<div className="banner-search">
				{(isMatchHome || isMatchTourHotel) && (
					<>
						{!(isMobile || isPad) && (
							<>
								<img src={bannerTitle} alt="search key word" />
								<p className="search-tip">台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
							</>
						)}
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
					</>
				)}
				<div className="search-selected">
					<div className="select-group">
						{(isMatchHome || isMatchTourHotel) && (
							<Select 
								list={isMatchHome ? placeCategoryList : hotelCategoryList}
								handleOnChange={handleSelectCategory}
								hint="類別"
							/>
						)}
						<Select
							list={formatCityList}
							handleOnChange={handleSelectCity}
							hint="縣市"
						/>
						{isMatchTraffic && (
							<Select
								list={formatBusStop}
								handleOnChange={handleSelectTripName}
								hint='選擇路線'
							/>
						)}
					</div>
					<button onClick={handleSearch}>
						<img src={searchIcon} alt="search key word" />
					</button>
				</div>
				{isMatchTraffic && currentBusStop && (
					<div className="choose-bus-way">
						<span
							onClick={() => changeIsBusWayStart(true)}
							className={isBusWayStart ? "selected" : ""}
						>往 {currentBusStop.DestinationStopNameZh}</span>
						<span 
							className={!isBusWayStart ? "selected" : ""}
							onClick={() => changeIsBusWayStart(false)}
						>往 {currentBusStop.DepartureStopNameZh}</span>
					</div>
				)}
			</div>
		</div>
	);
};
