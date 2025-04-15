import { updatePost } from '../../api/post/update';

export async function onUpdatePost(event) {
	event.preventDefault();

	const form = event.target;

	const title = form.elements.title.value.trim();
	const body = form.elements.body.value.trim();
	const tagString = form.elements.tags.value.trim();
	const tags = tagString ? tagString.split(',').map((tag) => tag.trim()) : [];
	const media = form.elements.media.value.trim() || null;

	const params = new URLSearchParams(window.location.search);
	const id = params.get('id');
	if (!id) {
		console.error('No post ID found in query parameters');
		return;
	}

	const postData = { title, body, tags, media };

	try {
		const response = await updatePost(id, postData);
		console.log('Post updated successfully', response);

		//user feedback (change to not alert when time)
		alert('Post updated successfully');

		// redirect to updated post page
		setTimeout(() => {
			window.location.href = `/post/${id}`;
		}, 2000);
	} catch (error) {
		console.error('Error updating post: ', error);
		const errorElement = document.getElementById('error-message');
		if (errorElement) {
			errorElement.textContent = error.message;
		}
	}
}
