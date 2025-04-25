import { authGuard } from '../../utilities/authGuard.js';
import { readPost } from '../../api/post/read.js';
import { onDeletePost } from '../../ui/post/delete.js';
import { onUpdatePost } from '../../ui/post/update.js';
import { onLogout } from '../../ui/global/logout.js';

authGuard();

const logoutBtn = document.getElementById('logout-button');
if (logoutBtn) logoutBtn.addEventListener('click', onLogout);

// Pull the `id` param from the query string
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
if (!postId) {
	// no id → back to feed
	window.location.href = '/';
}

(async function renderPost() {
	const container = document.getElementById('post-container');
	container.innerHTML = '<p>Loading…</p>';

	try {
		const { data: post } = await readPost(postId);

		container.innerHTML = `
      ${
				post.media?.url
					? `<img src="${post.media.url}"
                alt="Banner for ${post.title}"
                class="post-media" />`
					: ''
			}
      <h1>${post.title}</h1>
      <p><small>By ${post.author?.name || 'Unknown'}</small></p>
      <div>${post.body}</div>
      ${post.tags?.length ? `<p>Tags: ${post.tags.map((t) => `<span class="tag">${t}</span>`).join(' ')}</p>` : ''}
      <div class="post-actions">
        <a href="/post/edit/?id=${post.id}">Edit</a>
        <button id="delete-button" data-post-id="${post.id}">Delete</button>
      </div>
    `;

		const delBtn = document.getElementById('delete-button');
		if (delBtn) delBtn.addEventListener('click', onDeletePost);
	} catch (err) {
		console.error('Failed to load post:', err);
		container.innerHTML = `<p>Error: ${err.message}</p>`;
	}
})();
