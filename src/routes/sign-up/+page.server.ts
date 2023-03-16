import type { Actions, PageServerLoad } from '../sign-in/$types';

import mongoose from 'mongoose';
import { DATABASE_URL } from '$env/static/private';

export const actions = {
	signUp: async (_) => {
		await mongoose.connect(DATABASE_URL);
	}
} satisfies Actions;

export const load = (async ({ locals }) => {
	// if ((await locals.getSession()) !== null) {
	// 	throw redirect(307, '/app');
	// }
}) satisfies PageServerLoad;
