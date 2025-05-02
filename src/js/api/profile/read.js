import { apiRequest } from '../apiClient';
import { API_SOCIAL_PROFILES } from '../constants';

/**
 * Fetch a single profile, including who they follow and who follows them.
 * @param {string} username
 * @returns {Promise<{ data: object }>}
 */
export function readProfile(username) {
	const url = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}?_followers=true&_following=true`;
	return apiRequest(url, 'GET');
}

export async function readProfiles(limit, page) {}
