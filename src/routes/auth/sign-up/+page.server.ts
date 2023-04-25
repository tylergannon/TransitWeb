import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { Key } from '$lib/srv/model';

export const actions = {
	default: async ({ request, locals: { auth, setSession } }) => {
		const data = await request.formData();
		const email = data.get('email')?.valueOf() as string | null;
		const password = data.get('password')?.valueOf() as string | null;
		const firstName = data.get('firstName')?.valueOf() as string | null;
		const lastName = data.get('lastName')?.valueOf() as string | '';
		if (!firstName || !email || !password) {
			return fail(400, { message: 'failed validation' });
		}
		if ((await Key.count({ user_id: email })) !== 0) {
			return fail(400, { email: 'Already exists' });
		}
		await auth.createUser({
			primaryKey: {
				providerId: 'email',
				providerUserId: email.valueOf().toString(),
				password: password.valueOf().toString()
			},
			attributes: {
				firstName,
				lastName,
				tags: []
			}
		});

		const key = await auth.useKey('email', email, password);
		const session = await auth.createSession(key.userId);

		setSession(session);

		throw redirect(303, '/app');
	}
} satisfies Actions;
