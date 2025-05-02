import { createPost } from '../../api/post/create.js';

/**
 * Handle the “Create Post” form submission:
 * @param {SubmitEvent} event — the form’s submit event
 * @returns {Promise<void>}
 */

export async function onCreatePost(event) {
	event.preventDefault();

	const form = event.target;
	const submitBtn = document.getElementById('create-btn');
	const spinner = document.getElementById('create-spinner');

	// Gather form values
	const title = form.elements.title.value.trim();
	const body = form.elements.body.value.trim();
	const tags = form.elements.tags.value
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
	const rawMedia = form.elements.media.value.trim();

	// Build payload, excluding media if the field is left blank.
	const payload = { title, body, tags };
	if (rawMedia) {
		try {
			new URL(rawMedia);
			payload.media = {
				url: rawMedia,
				alt: `${title} - banner image`,
			};
		} catch {
			return alert('please enter a valid URL for the image');
		}
	}

	try {
		submitBtn.disabled = true;
		spinner.hidden = false;

		await createPost(payload);
		alert('Post created successfully!');
		// Redirect to feed
		window.location.href = '/';
	} catch (err) {
		console.error(err);
		document.getElementById('error-message').textContent = err.message;
	} finally {
		spinner.hidden = true;
		submitBtn.disabled = false;
	}
}
