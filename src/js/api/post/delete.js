import { apiRequest } from '../apiClient';
import { API_SOCIAL_POSTS } from '../constants';

/**
 * deletes a post by ID
 * @param {string} id - the ID of the post to delete
 * @returns {Promise<object>} - The API response
 */

export async function deletePost(id) {
	const url = `${API_SOCIAL_POSTS}/${id}`;
	return await apiRequest(url, 'DELETE');
}
