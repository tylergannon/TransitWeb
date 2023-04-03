import type { GeoNamesCityType } from '$lib/srv/model';

export const getCity = (id: number) =>
	fetch(`/app/api/city/${id}.json`).then<GeoNamesCityType>((res) => res.json());
