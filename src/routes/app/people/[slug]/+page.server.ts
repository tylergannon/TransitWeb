import { Person } from '$lib/srv/model';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { slug }, parent }) => {
	const { people } = await parent();
	if (Object.prototype.hasOwnProperty.call(people, slug)) {
		return {
			person: people[slug]
		};
	}
	try {
		const person = (await Person.findOne({ slug }))?.toObject() as ClientSidePerson;
		if (!person) {
			throw error(404, 'Not found');
		}
		return { person };
	} catch (e) {
		throw error(500, `Error: ${(e as Error).message}`);
	}
}) satisfies PageServerLoad;
