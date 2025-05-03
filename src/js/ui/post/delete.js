import { deletePost } from '../../api/post/delete';

export async function onDeletePost(event) {
	event.preventDefault();

	const postId = event.target.getAttribute('data-post-id');
	if (!postId) {
		console.error('No post ID provided for deletion');
		return;
	}

	if (!confirm('Are you sure you want to delete this post?')) {
		return;
	}

	try {
		const response = await deletePost(postId);
		console.log('Post deleted successfully:', response);
		alert('Post deleted successfully!');

		window.location.reload();
	} catch (error) {
		console.error('Error deleting post:', error);
		alert('Error deleting post: ' + error.message);
	}
}
