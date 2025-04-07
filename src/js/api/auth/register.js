import { apiRequest } from '../apiClient';
import { API_AUTH_REGISTER } from '../constants';
import { createApiKey } from './key';

document.addEventListener('DOMContentLoaded', () => {
	const form = document.forms.register;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const name = form.elements.name.value;
		const email = form.elements.email.value;
		const password = form.elements.password.value;
		const userData = { name, email, password };

		try {
			//User registration
			const registrationResult = await apiRequest(API_AUTH_REGISTER, 'POST', userData);
			console.log('Registration successful:', registrationResult);

			//upon successfull registration, create and store an API key.
			createApiKey();

			//optional redirect or successmessage goes here (later implementation)
		} catch (error) {
			console.error('Registration failed:', error);
			//remember to display an error message for user feedback.
		}
	});
});
