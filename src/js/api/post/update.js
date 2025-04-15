import { apiRequest } from '../apiClient';
import { API_SOCIAL_POSTS } from '../constants';

/**
 * Updates an existing post
 * @param {string} id - The ID of the post to update.
 * @param {object} postData - the updated post data (title, body, tags, media).
 * @returns {Promise<object} - The API response.
 */

export async function updatePost(id, postData) {
	const url = `${API_SOCIAL_POSTS}/${id}`;
	return await apiRequest(url, 'PUT', postData);
}
