import { authGuard } from '../../utilities/authGuard';
import { onDeletePost } from '../../ui/post/delete';
import { readPosts } from '../../api/post/read';
import { searchPosts } from '../../api/post/search';
import { onLogout } from '../../ui/global/logout';
import { initSearch } from '../../ui/search';

authGuard();

const container = document.getElementById('posts-container');
const logoutBtn = document.getElementById('logout-button');

// Render an array of post objects into the #posts-container

function renderPosts(posts) {
	container.innerHTML = '';

	posts.forEach((post) => {
		const card = document.createElement('div');
		card.classList.add('post-card');
		card.innerHTML = `
      ${post.media?.url ? `<img src="${post.media.url}" class="post-media" alt="Banner for ${post.title}" />` : ''}
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><small>
        By 
        <a href="/profile/?user=${encodeURIComponent(post.author.name)}">
          ${post.author.name}
        </a>
      </small></p>
      <a href="/post/?id=${post.id}">View</a>
      <a href="/post/edit/?id=${post.id}">Edit</a>
      <button class="delete-button" data-post-id="${post.id}">Delete</button>
    `;
		container.appendChild(card);
	});

	container.querySelectorAll('.delete-button').forEach((btn) => btn.addEventListener('click', onDeletePost));
}

/**
 * Load feed posts, either full list or with search, then render them.
 *
 * @param {string} [query]      If provided, does a full-text search.
 * @param {number} [limit=25]   Posts per page.
 * @param {number} [page=1]     Page number.
 */

async function loadAndRender(query = '', limit = 25, page = 1) {
	try {
		let result;
		if (query) {
			result = await searchPosts(query, limit, page);
		} else {
			result = await readPosts(limit, page);
		}
		renderPosts(result.data);
	} catch (err) {
		console.error('Error loading feed', err);
		container.textContent = 'Failed to load post. Please try again later.';
	}
}

// hook up search form to call loadAndRender with query
initSearch('#search-form', (q) => {
	loadAndRender(q);
});

//initial feed load.
loadAndRender();

if (logoutBtn) {
	logoutBtn.addEventListener('click', onLogout);
}
