import { apiRequest } from '../apiClient';
import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from '../constants';

/**
 * Fetches a single post by its ID
 * @param {string} id - the ID of the post.
 * @returns {Promise<object>} - The post data.
 */

export async function readPost(id) {
	const url = `${API_SOCIAL_POSTS}/${id}?_author=true`;
	return await apiRequest(url, 'GET');
}

/**
 * Fetches multiple posts with pagination and an optional tag.
 * @param {number} [limit=12] - Number of posts per page.
 * @param {number} [page=1] - page number.
 * @param {string} [tag] - optional tag, to filter posts
 * @returns {Promise<object>} - the post data.
 */

export async function readPosts(limit = 50, page = 1, tag) {
	let query = `?limit=${limit}&page=${page}&_author=true`;
	if (tag) {
		query += `&_tag=${encodeURIComponent(tag)}`;
	}
	const url = `${API_SOCIAL_POSTS}${query}`;
	return await apiRequest(url, 'GET');
}

/**
 * Fetches user specific posts, with pagination and optional tag
 * @param {string} username - The username whose posts to fetch.
 * @param {number} [limit=12] - number of posts per page.
 * @param {number} [page=1] - page number
 * @param {string} [tag] - Optional tag, to filter posts
 * @returns {Promise<object>} - the usesr's post data.
 */

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
	let query = `?limit=${limit}&page=${page}&_author=true`;
	if (tag) {
		query += `&_tag=${encodeURIComponent(tag)}`;
	}

	const url = `${API_SOCIAL_PROFILES}/${username}/posts${query}`;
	return await apiRequest(url, 'GET');
}
