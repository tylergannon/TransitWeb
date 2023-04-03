import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoadEvent } from './$types';

export const load = handleServerSession(async ({ locals }: LayoutServerLoadEvent) => {
	const userId = (await locals.validate())?.userId || null;
	if (userId == null) {
		return { user: null };
	}

	const { auth, validate } = locals;
	const {
		birthplace,
		dobUtc,
		firstName,
		id: _id,
		lastName,
		profileImg,
		tz,
		tags
	} = await auth.getUser(userId);

	return {
		user: {
			birthplace,
			dobUtc: dobUtc?.valueOf().toString(),
			firstName,
			_id,
			lastName,
			profileImg,
			tags,
			tz
		}
	};
});
