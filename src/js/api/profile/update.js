import { apiRequest } from '../apiClient.js';
import { API_SOCIAL_PROFILES } from '../constants.js';

export async function updateProfile(name, profileData) {
	const url = `${API_SOCIAL_PROFILES}/${name}`;
	return await apiRequest(url, 'PUT', profileData);
}
