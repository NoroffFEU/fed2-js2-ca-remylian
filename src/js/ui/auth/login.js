import { loginUser } from '../../api/auth/login.js';
import { createApiKey } from '../../api/auth/key.js';

export async function onLogin(event) {
	event.preventDefault();

	const form = event.target;
	const email = form.elements.email.value.trim();
	const password = form.elements.password.value;
	const creds = { email, password };

	const errorElem = document.getElementById('error-message');
	const successElem = document.getElementById('login-success-msg');
	const spinnerElem = document.getElementById('login-spinner');

	// reset messages
	errorElem.textContent = '';
	successElem.textContent = '';

	// show spinner
	spinnerElem.hidden = false;

	try {
		const { data: userData } = await loginUser(creds);

		if (!userData?.accessToken) {
			throw new Error('No access token returned.');
		}

		// store token & username
		localStorage.setItem('accessToken', userData.accessToken);
		localStorage.setItem('username', userData.name);

		// optionally try to getget API key
		const keyResponse = await createApiKey();
		console.log('API key:', keyResponse?.key);

		// hide spinner, show success
		spinnerElem.hidden = true;
		successElem.textContent = '✅ Login successful! Redirecting…';

		// wait a moment for the user to read

		setTimeout(() => {
			window.location.href = '/';
		}, 2000);
	} catch (err) {
		// hide spinner, show error
		spinnerElem.hidden = true;
		console.error('Login error:', err);
		errorElem.textContent = err.message;
	}
}
