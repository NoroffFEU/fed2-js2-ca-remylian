import { onCreatePost } from '../../ui/post/create';
import { authGuard } from '../../utilities/authGuard';

authGuard();

const form = document.forms.createPost;

if (form) {
	form.addEventListener('submit', onCreatePost);
}
