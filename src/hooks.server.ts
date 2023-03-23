import type { Handle } from '@sveltejs/kit';
import { handleHooks } from '@lucia-auth/sveltekit';
import { createClient } from '@redis/client';

import { REDIS_URL } from '$env/static/private';
import { buildAuth } from '$lib/srv/lucia';
import { sequence } from '@sveltejs/kit/hooks';
import { mongoose, GeoNamesCity } from '$lib/srv/model';

const redisClient = createClient({ url: REDIS_URL });
const auth = buildAuth(redisClient, mongoose);

const handleSession = handleHooks(auth);
import { DATABASE_URL } from '$env/static/private';

async function tryConnecting(prom: Promise<any>) {
	try {
		return await prom;
	} catch (err) {
		console.error(`Error connecting to database: ${err}`);
		process.exit(1);
	}
}

// The server should actually fail and quit if there's an error on either of these.
await Promise.all([redisClient.connect(), mongoose.connect(DATABASE_URL)].map(tryConnecting));

try {
	await GeoNamesCity.syncIndexes();
} catch (err) {
	console.error('Error ensuring indexes', err);
}

const handleDatabases = (({ event, resolve }) => {
	event.locals.redisClient = redisClient;
	event.locals.auth = auth;
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleDatabases, handleSession);
