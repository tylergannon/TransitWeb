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
	signIn: async ({ request, locals: { auth, setSession, validate } }) => {
		if (await validate()) {
			throw redirect(307, '/app');
		}
		const data = await request.formData();
		const email = data.get('email')?.valueOf() as string | null;
		const password = data.get('password')?.valueOf() as string | null;
		if (!email || !password) {
			throw fail(400);
		}

		try {
			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession(key.userId);
			setSession(session);
			throw redirect(307, '/app');
		} catch (sorkin) {
			return fail(400);
		}
	},
	signOut: async ({ locals }) => {
		const session = await locals.validate();
		if (!session) {
			return fail(401);
		}
		await locals.auth.invalidateSession(session.sessionId);
		locals.setSession(null);
		throw redirect(307, '/');
	}
} satisfies Actions;
