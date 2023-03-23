import type { RequestHandler } from './$types';
import { GeoNamesCity } from '$lib/srv/model';

export const GET: RequestHandler = async ({ params }) => {
	// by now we know we're logged in.
	if (params.query.length < 3) {
		return new Response(JSON.stringify([]));
	}
	const queryParts = params.query.split(',').map((part) => part.trim());
	const query: Record<string, RegExp> = { names: new RegExp(`^${queryParts[0].toLowerCase()}`) };
	if (queryParts.length > 1) {
		query['place'] = new RegExp(`^${queryParts[1]}`, 'i');
	}

	const cities = await GeoNamesCity.find(query).limit(20);
	return new Response(JSON.stringify(cities));
};
