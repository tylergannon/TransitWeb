import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Person, type PersonType } from '$lib/srv/model';
import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoadEvent } from './$types';

export const load = handleServerSession(async ({ locals }: LayoutServerLoadEvent) => {
	const userId = (await locals.validate())?.userId || null;
	if (userId == null) {
		return { user: null };
	}

	const { auth, validate } = locals;
	const { birthplace, dobUtc, firstName, id, lastName, profileImg, tz, tags } = await auth.getUser(
		userId
	);

	return {
		user: {
			birthplace,
			dobUtc,
			firstName,
			id,
			lastName,
			profileImg,
			tags,
			tz
		}
	};
});
