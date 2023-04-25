import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import mongoose from 'mongoose';
import ViteRestart from 'vite-plugin-restart'
import vitePluginPurgeCss from "@mojojoejo/vite-plugin-purgecss"

function disconnect() {
	return {
		name: 'disconnect',
		closeBundle() {
			mongoose.disconnect();
		}
	};
}

const viteRestart = ViteRestart({
	restart: [
		"src/lib/srv/*.ts"
	],
});

/**
 * Add the following to the server config in order to use https:
 * 	  https: {
 *    key: fs.readFileSync('/etc/letsencrypt/live/dev.me.transithd.com/privkey.pem'),
 *    cert: fs.readFileSync('/etc/letsencrypt/live/dev.me.transithd.com/cert.pem')
 *  },
 *  host: 'dev.me.transithd.com'
 */
export default defineConfig({
	plugins: [sveltekit(), vitePluginPurgeCss(), viteRestart, disconnect()],
	server: { },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
