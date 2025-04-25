import { authGuard } from '../../utilities/authGuard';
import { onDeletePost } from '../../ui/post/delete';
import { readPosts } from '../../api/post/read';
import { onLogout } from '../../ui/global/logout';

authGuard();

(async function initFeed() {
	const container = document.getElementById('posts-container');
	if (!container) return;

	try {
		const { data: posts } = await readPosts();
		container.innerHTML = '';

		posts.forEach((post) => {
			const card = document.createElement('div');
			card.classList.add('post-card');
			card.innerHTML = `
			<h2>${post.title}</h2>
			${post.media?.url || post.media ? `<img src="${post.media.url || post.media}" alt="Banner for ${post.title}" class="post-media" />` : ''}
			<p>${post.body}</p>
			<p><small>By <a href="/profile/?user=${encodeURIComponent(post.author.name)}" class="post-author">${post.author.name}</a></small></p>
			<a href="/post/?id=${post.id}">View</a>
			<a href="/post/edit/?id=${post.id}">Edit</a>
			<button class="delete-button" data-post-id="${post.id}">Delete</button>`;

			container.appendChild(card);
		});

		container.querySelectorAll('.delete-button').forEach((btn) => btn.addEventListener('click', onDeletePost));
	} catch (err) {
		console.error('Error loading feed:', err);
		container.textContent = 'Failed to load posts. Please try again later.';
	}
})();

const logoutBtn = document.getElementById('logout-button');
if (logoutBtn) {
	logoutBtn.addEventListener('click', onLogout);
}
