import type { RequestHandler } from './$types';
import { GeoNamesCity } from '$lib/srv/model';
import { error } from 'console';

export const GET: RequestHandler = async ({ params }) => {
	// by now we know we're logged in.
	const city = (await GeoNamesCity.findById(parseInt(params.placeId)).select('-__v'))?.toObject();
	if (!city) {
		throw error(404, 'City not found');
	}
	return new Response(JSON.stringify(city));
};
