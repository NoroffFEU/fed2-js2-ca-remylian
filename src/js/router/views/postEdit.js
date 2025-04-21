import { onUpdatePost } from '../../ui/post/update';
import { readPost } from '../../api/post/read';
import { authGuard } from '../../utilities/authGuard';

authGuard();

// the function is made as an expression instead of a declaration, for convenience.
(async function initEditForm() {
	const form = document.forms.editPost;
	const params = new URLSearchParams(window.location.search);
	const id = params.get('id');

	if (!form || !id) {
		console.error('Edit form or post ID not found');
		return;
	}

	try {
		const post = await readPost(id);

		form.elements.title.value = (post.title || '').trim();
		form.elements.body.value = (post.body || '').trim();
		form.elements.tags.value = (post.tags || []).join(',').trim();
		form.elements.media.value = (post.media || '').trim();
	} catch (err) {
		console.error('Failed to load post for editing;', err);
		// show error to user (implement later)
	}

	form.addEventListener('submit', onUpdatePost);
})();
