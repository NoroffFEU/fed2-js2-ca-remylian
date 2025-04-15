import { authGuard } from '../../utilities/authGuard';
import { onLogout } from '../../ui/global/logout';

authGuard();

const logoutBtn = document.getElementById('logout-button');
if (logoutBtn) {
	logoutBtn.addEventListener('click', onLogout);
}
