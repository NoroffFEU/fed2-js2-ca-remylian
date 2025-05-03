import { authGuard } from '../../utilities/authGuard';
import { readPost } from '../../api/post/read';
import { deletePost } from '../../api/post/delete';
import { onLogout } from '../../ui/global/logout';

authGuard();

(async function renderSinglePost() {
	const params = new URLSearchParams(window.location.search);
	const postId = params.get('id');
	if (!postId) {
		window.location.href = '/';
		return;
	}

	const spinner = document.getElementById('post-spinner');
	const container = document.getElementById('single-post');

	let post;
	try {
		spinner.hidden = false;
		container.textContent = '';
		({ data: post } = await readPost(postId));

		const me = localStorage.getItem('username')?.toLowerCase();
		const isMyPost = post.author.name.toLowerCase() === me;

		// build the HTML
		const html = `
      ${post.media?.url ? `<img src="${post.media.url}" alt="Banner for ${post.title}">` : ''}
      <div class="post-container-info">
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        <p><small>
          By
          <a href="/profile/?user=${encodeURIComponent(post.author.name)}">
            ${post.author.name}
          </a>
        </small></p>
      </div>
      <div class="post-actions">
        ${
					isMyPost
						? `<a href="/post/edit/?id=${post.id}" class="button">Edit</a>
               <button id="delete-button" class="button">Delete</button>`
						: `<a href="/" class="button">Back to Feed</a>`
				}
      </div>
    `;

		// render it
		container.innerHTML = html;

		// If this is my post, hook up the delete button
		if (isMyPost) {
			container.querySelector('#delete-button').addEventListener('click', async (e) => {
				e.preventDefault();
				if (!confirm('Are you sure you want to delete this post?')) return;

				try {
					await deletePost(post.id);

					window.location.href = '/';
				} catch (e) {
					console.error(e);
					alert('Failed to delete post');
				}
			});
		}
	} catch (err) {
		console.error('Failed to load post', err);
	} finally {
		spinner.hidden = true;
	}

	const logoutBtn = document.getElementById('logout-button');
	if (logoutBtn) logoutBtn.addEventListener('click', onLogout);
})();
