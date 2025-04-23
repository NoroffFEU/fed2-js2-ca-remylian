import { apiRequest } from '../apiClient';
import { API_SOCIAL_PROFILES } from '../constants';

//function to fetch user profile by username.

export async function readProfile(username) {
	const url = `${API_SOCIAL_PROFILES}/${username}`;
	return await apiRequest(url, 'GET');
}

export async function readProfiles(limit, page) {}
