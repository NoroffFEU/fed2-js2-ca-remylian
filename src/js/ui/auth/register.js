import { registerUser } from '../../api/auth/register.js';
import { createApiKey } from '../../api/auth/key.js';

export async function onRegister(event) {
	event.preventDefault();
	const form = event.target;

	const name = form.elements.name.value.trim();
	const email = form.elements.email.value.trim();
	const password = form.elements.password.value;
	const userData = { name, email, password };

	try {
		const regResponse = await registerUser(userData);
		console.log('Registration successful:', regResponse);

		// After successful registration, redirect the user to the login page.
		setTimeout(() => {
			window.location.href = '/auth/login/';
		}, 2000);
	} catch (error) {
		console.error('Registration failed:', error);

		// Optionally update the UI with an error message.
		const errorElement = document.getElementById('error-message');
		if (errorElement) {
			errorElement.textContent = error.message;
		}
	}
}
