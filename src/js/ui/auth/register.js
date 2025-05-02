import { registerUser } from '../../api/auth/register.js';

export async function onRegister(event) {
	event.preventDefault();

	const form = event.target;
	const name = form.elements.name.value.trim();
	const email = form.elements.email.value.trim();
	const password = form.elements.password.value;
	const userData = { name, email, password };

	const errorElem = document.getElementById('error-message');
	const successElem = document.getElementById('register-success-msg');
	const spinnerElem = document.getElementById('register-spinner');

	errorElem.textContent = '';
	successElem.textContent = '';
	spinnerElem.hidden = false;

	try {
		await registerUser(userData);

		spinnerElem.hidden = true;
		successElem.textContent = '✅ Registration successfull. Redirecting...';

		// After successful registration, redirect the user to the login page.
		const BASE = import.meta.env.BASE_URL;
		setTimeout(() => {
			window.location.href = `auth/login/ `;
		}, 2000);
	} catch (error) {
		console.error('Registration failed:', error);

		// update the UI with an error message.
		const errorElement = document.getElementById('error-message');
		if (errorElement) {
			errorElement.textContent = error.message;
		}
	}
}
