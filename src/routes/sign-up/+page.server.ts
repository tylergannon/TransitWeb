import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { mongoose, Key } from '$lib/srv/model';
import { DATABASE_URL } from '$env/static/private';

export const actions = {
	signUp: async (event) => {
		console.log('dude, sick.');
		await mongoose.connect(DATABASE_URL);
		const data = await event.request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const name = data.get('name');
		if (!name || !email || !password) {
			throw fail(400, { message: 'failed validation' });
		}
		if ((await Key.count({ user_id: email })) !== 0) {
			throw fail(400, { email: 'Already exists' });
		}
		await event.locals.auth.createUser({
			primaryKey: {
				providerId: 'email',
				providerUserId: email.valueOf().toString(),
				password: password.valueOf().toString()
			},
			attributes: {
				name
			}
		});

		throw redirect(303, '/home');
	}
} satisfies Actions;
