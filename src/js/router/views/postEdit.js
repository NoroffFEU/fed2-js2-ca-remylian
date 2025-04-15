import { onUpdatePost } from '../../ui/post/update';
import { authGuard } from '../../utilities/authGuard';

authGuard();

const form = document.forms.editPost;
if (form) {
	form.addEventListener('submit', onUpdatePost);
}
