import { apiRequest } from '../apiClient.js';
import { API_SOCIAL_POSTS } from '../constants.js';

/**
 * Search posts by title or body.
 *
 * @param {string} query        The search term.
 * @param {number} [limit=25]   How many posts per page.
 * @param {number} [page=1]     Which page of results.
 * @returns {Promise<object>}   The API response containing matching posts.
 */

export async function searchPosts(query, limit = 25, page = 1) {
	const params = new URLSearchParams({
		q: query,
		limit: String(limit),
		page: String(page),
		_author: 'true',
	});

	const url = `${API_SOCIAL_POSTS}/search?${params}`;
	return await apiRequest(url, 'GET');
}
