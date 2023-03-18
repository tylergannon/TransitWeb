import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if ((await locals.validate()) == null) {
		throw redirect(307, '/sign-in');
	}
	return {};
}) satisfies LayoutServerLoad;
