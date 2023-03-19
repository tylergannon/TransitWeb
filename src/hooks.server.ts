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

await Promise.all([redisClient.connect(), mongoose.connect(DATABASE_URL)]);

const handleDatabases = (({ event, resolve }) => {
	event.locals.redisClient = redisClient;
	event.locals.auth = auth;
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleDatabases, handleSession);
