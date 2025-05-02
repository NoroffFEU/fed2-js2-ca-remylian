import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	publicDir: 'public',
	build: {
		base: '/',
		target: 'esnext',
		rollupOptions: {
			input: {
				main: resolve(__dirname, './index.html'),
				auth: resolve(__dirname, './auth/index.html'),
				'auth/login': resolve(__dirname, './auth/login/index.html'),
				'auth/register': resolve(__dirname, './auth/register/index.html'),
				profile: resolve(__dirname, './profile/index.html'),
				post: resolve(__dirname, './post/index.html'),
				'post/create': resolve(__dirname, './post/create/index.html'),
				'post/edit': resolve(__dirname, './post/edit/index.html'),
			},
		},
	},
});
