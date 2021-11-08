import jsSHA from 'jssha';

const BASIC_URL = 'https://link.motc.gov.tw';
const TOURISM_URL = 'https://ptx.transportdata.tw/MOTC';
const DATA_TYPE = '?$format=JSON';

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

const fetchData = async (url: string, method?:string, data?: any, format?: string) => {
	try {
		const fetchOptions = {
			body: JSON.stringify(data),
			header: GetAuthorizationHeader(),
			method: method || 'GET',
		};
		const response = await fetch(`${url}${format || DATA_TYPE}`, fetchOptions);
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
	}
}

export const fetchCity = async () => {
	const response = await fetchData(`${BASIC_URL}/v2/Basic/City`);
	console.log(response);
};

export const fetchScenicSpot = async (city?: string) => {
	const response = await fetchData(`${TOURISM_URL}/v2/Tourism/ScenicSpot${city ? `/${city}`: ''}`);
	console.log(response);
};

export const fetchActivity = async (city?: string) => {
	const response = await fetchData(`${TOURISM_URL}/v2/Tourism/Activity${city ? `/${city}`: ''}`);
}

export const fetchRestaurant = async (city?: string) => {
	const response = await fetchData(`${TOURISM_URL}/v2/Tourism/Restaurant${city ? `/${city}`: ''}`);
}

export const fetchHotel = async (city?: string) => {
	const response = await fetchData(`${TOURISM_URL}/v2/Tourism/Hotel${city ? `/${city}`: ''}`);
}