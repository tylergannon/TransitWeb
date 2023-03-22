import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Person } from '$lib/srv/model';

export const load = (async ({ locals }) => {
	if ((await locals.validate()) == null) {
		throw redirect(307, '/sign-in');
	}
	const { auth, validate } = locals;
	const { birthplace, dobUtc, firstName, id, lastName, profileImg, tz, tags } = await auth.getUser(
		(await validate())!.userId
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
		},
		people: await Person.find({ userId: id })
	};
}) satisfies LayoutServerLoad;
