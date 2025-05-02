export function onLogout() {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('username');

	// if dynamic API KeyboardEvent, remove as well:
	// localStorage.removeItem('noroffApiKey');

	window.location.href = `${BASE}auth/login/`;
}
