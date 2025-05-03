import { updateProfile } from '../../api/profile/update.js';

export async function onUpdateProfile(event) {
	event.preventDefault();

	const form = event.target;
	const rawAvatar = form.elements.avatar.value.trim();
	const rawBanner = form.elements.banner.value.trim();
	const username = localStorage.getItem('username');

	const payload = {};

	if (rawAvatar) {
		payload.avatar = {
			url: rawAvatar,
			alt: `Avatar for ${username}`,
		};
	}
	if (rawBanner) {
		payload.banner = {
			url: rawBanner,
			alt: `Banner for ${username}`,
		};
	}

	if (!Object.keys(payload).length) {
		return alert('Please provide an avatar or banner URL to update.');
	}

	try {
		const res = await updateProfile(username, payload);
		alert('Profile updated successfully');
		window.location.reload();
	} catch (err) {
		console.error('Profile update error:', err);
		document.getElementById('error-message').textContent = err.message;
	}
}
