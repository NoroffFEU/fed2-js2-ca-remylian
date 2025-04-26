import { apiRequest } from '../apiClient';
import { API_SOCIAL_PROFILES } from '../constants';

export function followUser(username) {
	return apiRequest(`${API_SOCIAL_PROFILES}/${username}/follow`, 'PUT', null);
}

export function unfollowUser(username) {
	return apiRequest(`${API_SOCIAL_PROFILES}/${username}/unfollow`, 'PUT', null);
}
