import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { Key } from '$lib/srv/model';

export const actions = {
	signUp: async ({ request, locals: { auth, setSession } }) => {
		console.log('dude, sick.');
		const data = await request.formData();
		const email = data.get('email')?.valueOf() as string | null;
		const password = data.get('password')?.valueOf() as string | null;
		const name = data.get('name')?.valueOf() as string | null;
		if (!name || !email || !password) {
			throw fail(400, { message: 'failed validation' });
		}
		if ((await Key.count({ user_id: email })) !== 0) {
			throw fail(400, { email: 'Already exists' });
		}
		await auth.createUser({
			primaryKey: {
				providerId: 'email',
				providerUserId: email.valueOf().toString(),
				password: password.valueOf().toString()
			},
			attributes: {
				name
			}
		});

		const key = await auth.useKey('email', email, password);
		const session = await auth.createSession(key.userId);

		setSession(session);

		throw redirect(303, '/app');
	}
} satisfies Actions;
