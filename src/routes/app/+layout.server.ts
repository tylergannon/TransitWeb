import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Person } from '$lib/srv/model';
import type { ClientSidePerson } from '$lib/stores/people';

export const load = (async ({ locals, parent }) => {
	const parentData = await parent();

	if (parentData.user === null) {
		throw redirect(307, '/sign-in');
	}
	const userId = (await locals.validate())?.userId ?? -1;

	const people = (await Person.find({ userId }).select('-userId -__v')).map((person) => {
		return {
			...person.toObject(),
			_id: person._id.toHexString()
		};
	}) as ClientSidePerson[];

	return {
		user: parentData.user!,
		people
	};
}) satisfies LayoutServerLoad;
