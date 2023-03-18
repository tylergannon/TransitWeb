import type { Handle } from '@sveltejs/kit';
import { handleHooks } from '@lucia-auth/sveltekit';
import { createClient } from '@redis/client';

import { REDIS_URL } from '$env/static/private';
import { buildAuth } from '$lib/srv/lucia';
import { sequence } from '@sveltejs/kit/hooks';
import { mongoose } from '$lib/srv/model';

const redisClient = createClient({ url: REDIS_URL });
console.log(REDIS_URL, 'NICE');
const auth = buildAuth(redisClient);

const handleSession = handleHooks(auth);

const handleDatabases = (async ({ event, resolve }) => {
	const { locals } = event;
	locals.redisClient = redisClient;
	await redisClient.connect();
	locals.auth = auth;
	try {
		return resolve(event);
	} finally {
		if (redisClient.isReady) {
			// locals.redisClient.disconnect();
			await redisClient.quit();
			console.log('sick');
		}

		if (mongoose.connection.readyState === 1) {
			mongoose.connection.close();
		}
	}
}) satisfies Handle;

export const handle = sequence(handleDatabases, handleSession);
