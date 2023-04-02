import { fail, redirect, json } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { UserType } from '$lib/srv/model';
import { ObjectId } from 'bson';

export const actions = {
	saveProfile: async ({ request, locals: { auth, validate } }) => {
		const userId = (await validate())!.userId;
		const form = await request.formData();
		const user: Partial<UserType> = {};
		for (const [key, value] of form.entries()) {
			if (key === 'tags') {
				user.tags = (value.valueOf() as string).split(',').map((tag) => tag.trim());
			} else if (key === 'dobUtc') {
				const val = parseInt(value.valueOf() as string);
				if (!Number.isNaN(val)) {
					user.dobUtc = new Date(parseInt(value.valueOf() as string));
				}
			} else if (key === 'birthplace') {
				const val = parseInt(value.valueOf() as string);
				if (!Number.isNaN(val)) {
					user.birthplace = parseInt(value.valueOf() as string);
				}
			} else {
				user[key as 'profileImg' | 'firstName' | 'lastName' | 'tz'] = value.valueOf() as string;
			}
		}
		// TODO: validate data
		try {
			const { id: _, ...result } = await auth.updateUserAttributes(userId, user);
			return json({
				...result,
				dobUtc: result.dobUtc?.valueOf().toString(),
				_id: userId
			} as Omit<UserType, 'dobUtc'> & { dobUtc: string });
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Failed to save profile.' });
		}
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
