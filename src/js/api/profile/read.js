import { apiRequest } from '../apiClient';
import { API_SOCIAL_PROFILES } from '../constants';

//function to load a profile, and check whether I am following them.

export async function readProfile(name) {
	const url = `${API_SOCIAL_PROFILES}/${name}?_followers=true`;
	return await apiRequest(url, 'GET');
}

export async function readProfiles(limit, page) {}
