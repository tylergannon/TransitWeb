import type { RequestHandler } from './$types';
import type { ClientSidePerson } from '$lib/stores/people';

import { error } from '@sveltejs/kit';

import { Person } from '$lib/srv/model';

const nobody = { userId: '-1' };

export const GET: RequestHandler = async ({ params: { slug }, locals: { validate } }) => {
	const { userId } = (await validate()) || nobody;
	const person = (await Person.findOne({ userId, slug }))?.toObject();
	if (!person) {
		throw error(404, 'Not found');
	}
	return new Response(
		JSON.stringify({
			...person,
			_id: person._id.toHexString(),
			dobUtc: person.dobUtc.valueOf().toString()
		} as Omit<ClientSidePerson, 'dobUtc'> & { dobUtc: string })
	);
};
