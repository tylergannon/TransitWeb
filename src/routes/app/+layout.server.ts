import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Person, type PersonType } from '$lib/srv/model';
import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';

export const load = (async ({ locals, parent }) => {
	const parentData = await parent();

	if (parentData.user === null) {
		throw redirect(307, '/sign-in');
	}

	const people = (await Person.find({ userId: parentData.user.id }).select('-userId -__v')).map(
		(person) => {
			return {
				...person.toObject(),
				_id: person._id.toString()
			};
		}
	) as ClientSidePerson[];

	return {
		user: parentData.user!,
		people
	};
}) satisfies LayoutServerLoad;
