import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { fetchChart } from '$lib/hd';
import { fetchPerson } from '../[slug].json/client';

export const load = (async ({ params: { slug }, fetch }) => {
	try {
		const person = await fetchPerson(slug, fetch);
		if (!person) {
			throw error(404, 'Not found');
		}
		const chart = await fetchChart(person.dobUtc, person.tz, fetch);
		return {
			person,
			chart
		};
	} catch (e) {
		throw error(500, `Error: ${(e as Error).message}`);
	}
}) satisfies PageLoad;
