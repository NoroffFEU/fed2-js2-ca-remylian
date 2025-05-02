import { authGuard } from '../../utilities/authGuard';
import { readProfile } from '../../api/profile/read';
import { readPostsByUser } from '../../api/post/read';
import { onUpdateProfile } from '../../ui/profile/update';
import { onDeletePost } from '../../ui/post/delete';
import { followUser, unfollowUser } from '../../api/profile/follow';
import { onLogout } from '../../ui/global/logout';

authGuard();

(async function initProfilePage() {
	//  whose profile is it?
	const params = new URLSearchParams(window.location.search);
	const profileUsername = params.get('user') || localStorage.getItem('username');
	if (!profileUsername) return;

	const me = localStorage.getItem('username')?.toLowerCase();
	const isMyProfile = profileUsername.toLowerCase() === me;

	//  remove "Create Post" link if not my profile
	if (!isMyProfile) {
		document.getElementById('create-post-link')?.remove();
	}

	//  fetch profile (with followers + following)
	let profile;
	try {
		({ data: profile } = await readProfile(profileUsername));
	} catch (err) {
		console.error('Failed to load profile', err);
		return;
	}
	const { followers = [], following = [] } = profile;

	//  show follower count (updates later)
	const countEl = document.getElementById('follow-counter');
	if (countEl) {
		countEl.textContent = `Followers: ${followers.length} · Following: ${following.length}`;
	}

	// render profile info
	document.getElementById('profile-username').textContent = profile.name;
	document.getElementById('profile-email').textContent = profile.email;
	document.getElementById('avatar-img').src = profile.avatar?.url || '';
	document.getElementById('banner-img').src = profile.banner?.url || '';

	//  show/hide update form
	const updSection = document.getElementById('profile-update-section');
	if (isMyProfile) {
		const form = document.forms.updateProfile;
		form.elements.avatar.value = profile.avatar?.url || '';
		form.elements.banner.value = profile.banner?.url || '';
		form.addEventListener('submit', onUpdateProfile);
	} else {
		updSection?.remove();
	}

	//  follow/unfollow button on *other* profiles
	if (!isMyProfile) {
		const actions = document.getElementById('profile-actions');
		const btn = document.createElement('button');
		let isFollowing = followers.some((u) => u.name.toLowerCase() === me);

		const setLabel = () => (btn.textContent = isFollowing ? 'Unfollow' : 'Follow');
		setLabel();

		btn.addEventListener('click', async () => {
			btn.disabled = true;
			try {
				if (isFollowing) await unfollowUser(profileUsername);
				else await followUser(profileUsername);

				// re-fetch and re-calc
				({ data: profile } = await readProfile(profileUsername));

				const { data: updatedProfile } = await readProfile(profileUsername);
				const newFollowers = updatedProfile.followers || [];
				const newFollowing = updatedProfile.following || [];

				// update the isFollowing flag and button label
				isFollowing = newFollowers.some((u) => u.name.toLowerCase() === me);
				setLabel();

				// refresh the counter to reflect new status
				if (countEl) {
					countEl.textContent = `Followers: ${newFollowers.length} · Following: ${newFollowing.length}`;
				}
			} catch (err) {
				console.error('Follow toggle failed', err);
				alert('Could not update follow status');
			} finally {
				btn.disabled = false;
			}
		});

		actions.appendChild(btn);
	}

	//  load & render posts
	try {
		const { data: posts } = await readPostsByUser(profileUsername);
		const container = document.getElementById('posts-container');
		container.innerHTML = '';
		posts.forEach((post) => {
			const card = document.createElement('div');
			card.classList.add('post-card');

			let html = `
        <h4>${post.title}</h4>
        ${post.media?.url ? `<img src="${post.media.url}" class="post-media" alt="Banner for ${post.title}" />` : ''}
        <p>${post.body}</p>
        <div class="post-card-actions">
          <a href="post/?id=${post.id}" class="button">View</a>
      `;
			if (post.author.name.toLowerCase() === me) {
				html += `
          <a href="post/edit/?id=${post.id}" class="button">Edit</a>
          <button class="button delete-button" data-post-id="${post.id}">Delete</button>
        `;
			}
			html += '</div>';
			card.innerHTML = html;
			container.appendChild(card);
		});
		container.querySelectorAll('.delete-button').forEach((btn) => btn.addEventListener('click', onDeletePost));
	} catch (err) {
		console.error('Failed to load user posts:', err);
	}

	// 9) logout
	document.getElementById('logout-button')?.addEventListener('click', onLogout);
})();
