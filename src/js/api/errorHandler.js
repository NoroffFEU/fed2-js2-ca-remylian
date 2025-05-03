/**
 * Function to centralize error handling
 * @param {*} response
 */

export async function handleApiError(response) {
	let errorMessage = `API request failed with status: ${response.status}`;

	try {
		const errorData = await response.json();

		errorMessage = errorData.message || errorMessage;
	} catch (e) {
		console.error('Error parsing error response:', e);
	}

	console.error('API error:', errorMessage);
	throw new Error(errorMessage);
}
