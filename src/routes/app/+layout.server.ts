import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if ((await locals.validate()) == null) {
		throw redirect(307, '/sign-in');
	}
	const { auth, validate } = locals;
	const { birthplace, dobUtc, firstName, id, lastName, profileImg, tz } = await auth.getUser(
		(await validate())!.userId
	);
	return {
		birthplace,
		dobUtc,
		firstName,
		id,
		lastName,
		profileImg,
		tz
	};
}) satisfies LayoutServerLoad;
