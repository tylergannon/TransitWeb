import type { RequestHandler } from './$types';
import { ASTROAPI_URL } from '$env/static/private';

const headers = { 'content-type': 'application/json' };

export const GET: RequestHandler = async ({ params: { path }, fetch, url }) => {
	const res = await fetch(`${ASTROAPI_URL}/${path}${url.search}`);
	return new Response(await res.text(), { headers });
};
