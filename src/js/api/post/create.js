import { apiRequest } from '../apiClient';
import { API_SOCIAL_POSTS } from '../constants';

/**
 * Creates a new post
 * @param {object} postData - The data for the new post (title, body, tags, media etc.)
 * @returns {Promise<object>} - The API response, including the created post.
 */

export async function createPost(postData) {
	return await apiRequest(API_SOCIAL_POSTS, 'POST', postData);
}
