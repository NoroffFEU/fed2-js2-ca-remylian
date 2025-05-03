import { updatePost } from '../../api/post/update';

export async function onUpdatePost(event) {
	event.preventDefault();

	const form = event.target;
	const submitBtn = document.getElementById('edit-btn');
	const spinner = document.getElementById('edit-spinner');

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
		submitBtn.disabled = true;
		spinner.hidden = false;

		await updatePost(id, postData);

		const successMsg = document.getElementById('success-msg');
		successMsg.textContent = 'Post updated successfully!';
		// redirect to updated post page
		setTimeout(() => {
			window.location.href = `/post/?id=${id}`;
		}, 2000);
	} catch (err) {
		console.error(err);
		document.getElementById('error-message').textContent = err.message;
	} finally {
		submitBtn.disabled = false;
		spinner.hidden = true;
	}
}
