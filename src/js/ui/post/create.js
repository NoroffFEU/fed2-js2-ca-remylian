import { createPost } from '../../api/post/create';

export async function onCreatePost(event) {
	event.preventDefault();

	const form = event.target;
	const title = form.elements.title.value.trim();
	const body = form.elements.body.value.trim();

	// tags are entered as a string separated by commas, so we convert it to an array.
	const tagString = form.elements.tags.value.trim();
	const tags = tagString ? tagString.split(',').map((tag) => tag.trim()) : [];

	const media = form.elements.media.value.trim() || null;

	const postData = { title, body, tags, media };

	try {
		const response = await createPost(postData);
		console.log('Post created successfully:', response);

		alert('Post created successfully!');

		//clear form after successful submission
		form.reset();
	} catch (error) {
		console.error('Error creating post:', error);

		const errorElement = document.getElementById('error-message');
		if (errorElement) {
			errorElement.textContent = error.message;
		}
	}
}
