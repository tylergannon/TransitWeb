import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Person, type PersonType } from '$lib/srv/model';
import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';

export const load = (async ({ locals, parent }) => {
	const parentData = await parent();

	if (parentData.user === null) {
		throw redirect(307, '/sign-in');
	}

	const peopleList: [string, ClientSidePerson][] = (
		await Person.find({ userId: parentData.user.id }).select('-userId -__v')
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
		user: parentData.user!,
		people: Object.fromEntries(peopleList) as PeopleStore
	};
}) satisfies LayoutServerLoad;
