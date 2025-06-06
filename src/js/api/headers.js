import { API_KEY } from './constants';

export function headers() {
	const headers = new Headers();

	//check for accesstoken
	const token = localStorage.getItem('accessToken');
	if (token) {
		headers.append('Authorization', `Bearer ${token}`);
	}

	// Retrieve the Noroff API key either from localStorage or as a fallback from constants.
	const key = localStorage.getItem('noroffApiKey') || API_KEY;
	if (key) {
		headers.append('X-Noroff-API-Key', key);
	}

	return headers;
}
