export function headers() {
	const headers = new Headers();

	const key = localStorage.getItem('noroffApiKey') || API_KEY;

	if (key) {
		headers.append('X-Noroff-API-Key', API_KEY);
	}

	return headers;
}
