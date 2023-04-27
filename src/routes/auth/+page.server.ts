import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async ({ locals }) => {
	if ((await locals.validate()) !== null) {
		throw redirect(307, '/app');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals }) => {
		const session = await locals.validate();
		if (!session) {
			return fail(401);
		}
		await locals.auth.invalidateSession(session.sessionId);
		locals.setSession(null);
		throw redirect(307, '/');
	}
} satisfies Actions;
