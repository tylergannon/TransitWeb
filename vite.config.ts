import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit()],
	// server: {
	//   https: {
	//     key: fs.readFileSync('/etc/letsencrypt/live/dev.me.transithd.com/privkey.pem'),
	//     cert: fs.readFileSync('/etc/letsencrypt/live/dev.me.transithd.com/cert.pem')
	//   },
	//   host: 'dev.me.transithd.com'
	// },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
