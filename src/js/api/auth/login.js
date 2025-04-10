import { apiRequest } from '../apiClient.js';
import { API_AUTH_LOGIN } from '../constants.js';

/**
 * Sends a login request to the Noroff API.
 * @param {object} credentials - The login credentials (email and password).
 * @returns {Promise<object>} - The response from the API, which should include an access token.
 */
export async function loginUser(credentials) {
	return await apiRequest(API_AUTH_LOGIN, 'POST', credentials);
}
