// import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { auth, validate } }) => {
	// if (await locals.getSession() !== null) {
	//   throw redirect(307, "/app")
	// }
	return {};
}) satisfies PageServerLoad;
