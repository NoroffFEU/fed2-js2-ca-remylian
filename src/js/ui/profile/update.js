// import { updateProfile } from '../../api/profile/update';

// export async function onUpdateProfile(event) {
// 	event.preventDefault();

// 	const form = event.target;
// 	const avatar = form.elements.avatar.value.trim() || null;
// 	const banner = form.elements.banner.value.trim() || null;
// 	const username = localStorage.getItem('username');

// 	try {
// 		const res = await updateProfile(username, { avatar, banner });
// 		alert('Profile updated'); //replace with successmessage and delay.

// 		window.location.reload();
// 	} catch (err) {
// 		console.error(err);
// 		document.getElementById('error-message').textContent = err.message;
// 	}
// }
import { updateProfile } from '../../api/profile/update.js';

export async function onUpdateProfile(event) {
	event.preventDefault();

	const form = event.target;
	const rawAvatar = form.elements.avatar.value.trim();
	const rawBanner = form.elements.banner.value.trim();
	const username = localStorage.getItem('username');

	// Build a payload matching the API spec
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
	// (Optional) If you add a bio field later:
	// const rawBio = form.elements.bio.value.trim();
	// if (rawBio) payload.bio = rawBio;

	// You must send at least one property
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
