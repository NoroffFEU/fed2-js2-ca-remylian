import { authGuard } from '../../utilities/authGuard';
import { readProfile } from '../../api/profile/read';
import { readPostsByUser } from '../../api/post/read';
import { onUpdateProfile } from '../../ui/profile/update';
import { onDeletePost } from '../../ui/post/delete';

authGuard();

(async function initProfilePage() {
	const username = localStorage.getItem('username');
	if (!username) return;

	//since the profile variable is called outside the try block, we need the scope to be global.
	let profile;

	//fetch and render profile info.
	try {
		({ data: profile } = await readProfile(username));
		document.getElementById('profile-username').textContent = profile.name;
		document.getElementById('profile-email').textContent = profile.email;
		document.getElementById('avatar-img').src = profile.avatar?.url || '';
		document.getElementById('banner-img').src = profile.banner?.url || '';
	} catch (err) {
		console.error('Failed to load profile', err);
	}

	//Pre-fill update form

	const form = document.forms.updateProfile;
	if (form && profile) {
		form.elements.avatar.value = profile.avatar?.url || '';
		form.elements.banner.value = profile.banner?.url || '';
		form.addEventListener('submit', onUpdateProfile);
	}

	//fetch and display user posts:

	try {
		const { data: posts } = await readPostsByUser(username);
		const container = document.getElementById('posts-container');
		container.innerHTML = '';

		posts.forEach((post) => {
			const card = document.createElement('div');
			card.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.body}</p>
      <a href="/post/edit/?id=${post.id}">Edit</a>
      <button class="delete-button" data-post-id="${post.id}">Delete</button>`;
			container.appendChild(card);
		});

		container.querySelectorAll('.delete-button').forEach((btn) => btn.addEventListener('click', onDeletePost));
	} catch (err) {
		console.error('failed to load user posts:', err);
	}
})();
