import { authGuard } from '../../utilities/authGuard';
import { onDeletePost } from '../../ui/post/delete';
import { readPosts } from '../../api/post/read';
import { onLogout } from '../../ui/global/logout';
import { initSearch } from '../../ui/search';

authGuard();

const container = document.getElementById('posts-container');
const logoutBtn = document.getElementById('logout-button');

/**
 * Renders an array of post objects into the #posts-container
 */
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

	// Hook up all delete‐buttons
	container.querySelectorAll('.delete-button').forEach((btn) => btn.addEventListener('click', onDeletePost));
}

/**
 * Fetches posts (optionally filtered by tag) and renders them
 */
async function loadAndRender(limit = 25, page = 1, tag) {
	try {
		const { data: posts } = await readPosts(limit, page, tag);
		renderPosts(posts);
	} catch (err) {
		console.error('Error loading feed:', err);
		container.textContent = 'Failed to load posts. Please try again later.';
	}
}

// Initialize the search form handler
initSearch('#search-form', (query) => {
	console.log('Searching for tag:', query);
	loadAndRender(25, 1, query);
});

// Initial unfiltered feed load
loadAndRender();

if (logoutBtn) {
	logoutBtn.addEventListener('click', onLogout);
}
