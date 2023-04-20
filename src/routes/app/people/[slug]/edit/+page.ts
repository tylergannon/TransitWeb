import type { GeoNamesCityType } from '$lib/srv/model';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params: { slug }, parent }) => {
	const {
		person: { placeId }
	} = await parent();
	const place: GeoNamesCityType = await fetch(`/app/places/${placeId}.json`).then((r) => r.json());

	return { place };
}) satisfies PageLoad;
