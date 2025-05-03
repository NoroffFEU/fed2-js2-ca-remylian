import { headers } from './headers';
import { handleApiError } from './errorHandler';

/**
 * A generic function to make API requests.
 *
 * @param {string} url - The endpoint URL to call.
 * @param {string} [method='GET'] - HTTP method to use.
 * @param {object|null} [body=null] - Optional data to send with the request.
 * @returns {Promise<object>} - The JSON response from the API.
 * @throws {Error} - If the request fails.
 */
export async function apiRequest(url, method = 'GET', body = null) {
	const options = {
		method,
		headers: headers(),
	};

	if (body) {
		options.body = JSON.stringify(body);
		options.headers.append('Content-Type', 'application/json');
	}

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			if (response.status === 204) return {};
			await handleApiError(response);
		}
		if (response.status === 204) return {};
		return await response.json();
	} catch (error) {
		console.error('Error during API request:', error);
		throw error;
	}
}
