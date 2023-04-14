import type { LayoutLoad } from './$types';

import { error } from '@sveltejs/kit';
import { fetchChart } from '$lib/hd';
import { fetchPerson } from '../[slug].json/client';

export const load = (async ({ fetch, params: { slug }, parent }) => {
	try {
		await parent();
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
}) satisfies LayoutLoad;
