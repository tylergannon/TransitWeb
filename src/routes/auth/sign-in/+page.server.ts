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
	default: async ({ request, locals: { auth, setSession, validate } }) => {
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
			const { userId } = await auth.useKey('email', email, password);
			setSession(await auth.createSession(userId));
		} catch (sorkin) {
			return fail(400);
		}
		throw redirect(307, '/app');
	}
} satisfies Actions;
