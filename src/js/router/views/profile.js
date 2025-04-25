import { authGuard } from '../../utilities/authGuard';
import { readProfile } from '../../api/profile/read';
import { readPostsByUser } from '../../api/post/read';
import { onUpdateProfile } from '../../ui/profile/update';
import { onDeletePost } from '../../ui/post/delete';
import { followUser, unfollowUser } from '../../api/profile/follow';

authGuard();

(async function initProfilePage() {
	//Load ANY user, or fallback to myself
	const params = new URLSearchParams(window.location.search);
	const username = params.get('user') || localStorage.getItem('username');
	if (!username) return;

	const me = localStorage.getItem('username');

	let profile;

	try {
		const { data } = await readProfile(username);
		profile = data;
	} catch (err) {
		console.error('Failed to load profile', err);
		return;
	}

	const isMyProfile = username === me;
	//check if i am allready following the user(case insensitive)
	let isFollowing = profile.following.some((u) => u.name.toLowerCase() === me.toLowerCase());

	//Render profile info.
	document.getElementById('profile-username').textContent = profile.name;
	document.getElementById('profile-email').textContent = profile.email;
	document.getElementById('avatar-img').src = profile.avatar?.url || '';
	document.getElementById('banner-img').src = profile.banner?.url || '';

	//render follow/unfollow button if it is NOT my profile.
	if (!isMyProfile) {
		const actions = document.getElementById('profile-actions');
		const btn = document.createElement('button');
		btn.id = 'follow-btn';
		btn.textContent = isFollowing ? 'Unfollow' : 'Follow';
		actions.appendChild(btn);

		//implement toggle functionality.
		btn.addEventListener('click', async () => {
			try {
				if (isFollowing) {
					await unfollowUser(username);
					btn.textContent = 'Follow';
					isFollowing = false;
				} else {
					await followUser(username);
					btn.textContent = 'Unfollow';
					isFollowing = true;
				}
			} catch (err) {
				console.error('Follow toggle failed', err);
				alert('Could not update follow status');
			}
		});
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
			${post.media?.url || post.media ? `<img src="${post.media.url || post.media}" alt="Banner for ${post.title}" class="post-media" />` : ''}
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
