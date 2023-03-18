import type { Handle } from '@sveltejs/kit';
import { handleHooks } from '@lucia-auth/sveltekit';
import { createClient } from '@redis/client';

import { REDIS_URL } from '$env/static/private';
import { buildAuth } from '$lib/srv/lucia';
import { sequence } from '@sveltejs/kit/hooks';
import { mongoose } from '$lib/srv/model';

const redisClient = createClient({ url: REDIS_URL });
const auth = buildAuth(redisClient, mongoose);

const handleSession = handleHooks(auth);
import { DATABASE_URL } from '$env/static/private';

const handleDatabases = (async ({ event, resolve }) => {
	const { locals } = event;
	locals.redisClient = redisClient;

	await Promise.all([redisClient.connect(), mongoose.connect(DATABASE_URL)]);

	locals.auth = auth;
	try {
		// Be sure to await here before closing db connections.
		return await resolve(event);
	} finally {
		if (redisClient.isOpen) {
			redisClient.disconnect();
		}
		if (mongoose.connection.readyState === 1) {
			mongoose.disconnect();
		}
	}
}) satisfies Handle;

export const handle = sequence(handleDatabases, handleSession);
