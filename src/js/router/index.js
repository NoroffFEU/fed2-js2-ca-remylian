// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

const BASE = import.meta.env.BASE_URL;
console.log({ BASE, rawpath: window.location.pathname });

export default async function router(rawpath = window.location.pathname) {
	const pathname = rawpath.replace(BASE, '/');
	console.log('→ routing to', pathname);

	switch (pathname) {
		case '/':
			await import('./views/home.js');
			break;

		case '/auth/':
			await import('./views/auth.js');
			break;

		case '/auth/login/':
			await import('./views/login.js');
			break;

		case '/auth/register/':
			await import('./views/register.js');
			break;

		case '/post/':
			await import('./views/post.js');
			break;

		case '/post/edit/':
			await import('./views/postEdit.js');
			break;

		case '/post/create/':
			await import('./views/postCreate.js');
			break;

		case '/profile/':
			await import('./views/profile.js');
			break;

		default:
			await import('./views/notFound.js');
	}
}
