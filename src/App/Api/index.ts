import jsSHA from 'jssha';

const TOURISM_URL = 'https://ptx.transportdata.tw/MOTC';
const DATA_TYPE = 'JSON';
const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export type APiResponseType = {
	status?: string;
	data: any;
	success: boolean;
};

const GetAuthorizationHeader = () => {
	const APP_ID = process.env.REACT_APP_APP_ID;
	const APP_KEY: string = process.env.REACT_APP_APP_KEY || '';
	const GMTString = new Date().toUTCString();
	const ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(APP_KEY, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	const HMAC = ShaObj.getHMAC('B64');
	const Authorization = `hmac username="${APP_ID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

	return {
		'Authorization': Authorization,
		'X-Date': GMTString,
		'content-type': 'application/json',
		/*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}

const fetchData = async (
		url: string, 
		top?: string,
		format?: string,
		data?: any, 
		method?:string, 
	) => {
	try {
		const fetchOptions = {
			body: JSON.stringify(data),
			header: GetAuthorizationHeader(),
			method: method || 'GET',
		};
		const query = `?$format=${format || DATA_TYPE}${top ? `&$top=${top}` : ''}`;
		const response = await fetch(`${url}${query}`, fetchOptions);
		const { status } = response;
		if (status !== 200) {
			console.warn(response);
			return {
				status,
				data: response,
				success: false,
			}
		}
		const resultData = await response.json();
		return {
			status,
			data: resultData,
			success: true,
		};
	} catch (error) {
		console.warn(error);
		return {
			data: error,
			success: false,
		};	
	}
}

export const fetchScenicSpot = async (city?: string, top?:string) => {
	const response = await fetchData(
		`${TOURISM_URL}/v2/Tourism/ScenicSpot${city ? `/${city}`: ''}`,
		top,
	);
	return response;
};

export const fetchActivity = async (city?: string, top?:string) => {
	const response = await fetchData(
		`${TOURISM_URL}/v2/Tourism/Activity${city ? `/${city}`: ''}`,
		top,
	);
	return response;
}

export const fetchRestaurant = async (city?: string, top?:string) => {
	const response = await fetchData(
		`${TOURISM_URL}/v2/Tourism/Restaurant${city ? `/${city}`: ''}`,
		top,
	);
	return response;
}

export const fetchHotel = async (city?: string, top?:string) => {
	const response = await fetchData(
		`${TOURISM_URL}/v2/Tourism/Hotel${city ? `/${city}`: ''}`,
		top,
	);
	return response;
}