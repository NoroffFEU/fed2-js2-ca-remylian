import { loginUser } from '../../api/auth/login.js';

export async function onLogin(event) {
	event.preventDefault();

	const form = event.target;
	const email = form.elements.email.value.trim();
	const password = form.elements.password.value;
	const credentials = { email, password };

	try {
		const loginResponse = await loginUser(credentials);
		console.log('Login successful:', loginResponse);

		const { data: userData } = loginResponse;
		if (userData && userData.accessToken) {
			localStorage.setItem('accessToken', userData.accessToken);
			localStorage.setItem('username', userData.name);
			console.log('Access token stored in localStorage:', userData.accessToken);
		} else {
			console.warn('No access token found in the response.');

			const keyResponse = await createApiKey();
			if (keyResponse && keyResponse.key) {
				console.log('API key stored:', keyResponse.key);
			}
		}

		// Redirect the user to the home/feed after login:
		setTimeout(() => {
			window.location.href = '/';
		}, 2000);
	} catch (error) {
		console.error('Login failed:', error);
		const errorElement = document.getElementById('error-message');
		if (errorElement) {
			errorElement.textContent = error.message;
		}
	}
}
