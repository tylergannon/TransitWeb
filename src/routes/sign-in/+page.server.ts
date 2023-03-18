import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if ((await locals.validate()) !== null) {
		throw redirect(307, '/home');
	}
	return {};
}) satisfies PageServerLoad;
