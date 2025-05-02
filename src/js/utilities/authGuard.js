export function authGuard() {
	const BASE = import.meta.env.BASE_URL;
	if (!localStorage.getItem('accessToken')) {
		alert('You must be logged in to view this page');
		window.location.href = `${BASE}auth/login/`;
	}
}
