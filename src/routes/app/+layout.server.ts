import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Person, type PersonType } from '$lib/srv/model';

export const load = (async ({ locals }) => {
	if ((await locals.validate()) == null) {
		throw redirect(307, '/sign-in');
	}
	const { auth, validate } = locals;
	const { birthplace, dobUtc, firstName, id, lastName, profileImg, tz, tags } = await auth.getUser(
		(await validate())!.userId
	);
	const peopleList: [string, ClientSidePerson][] = (
		await Person.find({ userId: id }).select('-userId -__v')
	).map((p) => {
		return [
			p.slug,
			{
				...p.toObject(),
				_id: p._id.toString()
			}
		];
	});

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
		people: Object.fromEntries(peopleList) as PeopleStore
	};
}) satisfies LayoutServerLoad;
