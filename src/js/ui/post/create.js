import { createPost } from '../../api/post/create.js';

export async function onCreatePost(event) {
	event.preventDefault();
	const form = event.target;

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
		const response = await createPost(payload);
		alert('Post created successfully!');

		// Redirect to feed
		window.location.href = '/';
	} catch (err) {
		console.error('Error creating post:', err);
		document.getElementById('error-message').textContent = err.message;
	}
}
