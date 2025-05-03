import { apiRequest } from '../apiClient';
import { API_SOCIAL_PROFILES } from '../constants';

/**
 * Follow a profile by its username.
 * @param {string} username
 * @returns {Promise<{ data: object }>}
 */
export function followUser(username) {
	const url = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}/follow`;
	return apiRequest(url, 'PUT');
}

/**
 * Unfollow a profile by its username.
 * @param {string} username
 * @returns {Promise<{ data: object }>}
 */
export function unfollowUser(username) {
	const url = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}/unfollow`;
	return apiRequest(url, 'PUT');
}
