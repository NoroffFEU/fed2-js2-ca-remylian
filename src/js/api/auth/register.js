import { apiRequest } from '../apiClient';
import { API_AUTH_REGISTER } from '../constants';

/**
 * Sends a registration request to the API.
 *
 * @param {object} userData - The registration data (name, email, password).
 * @returns {Promise<object>} - The response from the API.
 */

export async function registerUser(userData) {
	return await apiRequest(API_AUTH_REGISTER, 'POST', userData);
}
