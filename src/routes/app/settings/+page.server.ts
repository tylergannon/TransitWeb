import { fail, redirect, json } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { UserType } from '$lib/srv/model';

export const actions = {
	saveProfile: async ({ request, locals: { auth, validate } }) => {
		const userId = (await validate())!.userId;
		const form = await request.formData();
		const user: Partial<UserType> = {};
		for (const [key, value] of form.entries()) {
			user[key as 'profileImg' | 'firstName' | 'lastName' | 'tz'] = value.valueOf() as string;
		}
		console.log(`Saving profile for user ${userId}:`, user);

		// TODO: validate data
		try {
			auth.updateUserAttributes(userId, user);
		} catch (e) {
			return fail(500, { message: 'Failed to save profile.' });
			console.error(e);
		}
		return { status: 200 };
	},
	changePassword: async ({ request, locals: { auth, validate } }) => {
		const form = await request.formData();
		const oldPassword = form.get('oldPassword')?.valueOf() as string | null;
		const newPassword = form.get('password')?.valueOf() as string | null;
		if (oldPassword === null || newPassword === null) {
			return fail(403, { message: 'Must supply old and new passwords.' });
		}
		try {
			const key = await auth.getKey('email', (await validate())!.userId);
			await auth.useKey('email', key.providerUserId, oldPassword);
			await auth.updateKeyPassword('email', key.providerUserId, newPassword);
			throw redirect(307, '/app/settings');
		} catch (e) {
			return fail(403, { message: 'Wrong password or bad new password.' });
		}
	}
} satisfies Actions;
