import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import fs from 'fs';

/**
 * Add the following to the server config in order to use https:
 * 	  https: {
 *    key: fs.readFileSync('/etc/letsencrypt/live/dev.me.transithd.com/privkey.pem'),
 *    cert: fs.readFileSync('/etc/letsencrypt/live/dev.me.transithd.com/cert.pem')
 *  },
 *  host: 'dev.me.transithd.com'
 */
export default defineConfig({
	plugins: [sveltekit()],
	server: { },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
