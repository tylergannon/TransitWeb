import type { GeoNamesCityType, PersonType } from '$lib/srv/model';
import derivedStore from '$lib/stores/asyncDerivedStore';
import type { Readable } from 'svelte/store';
const API_PATH = '/app/api/findCity/';

const fetchCities = async (value: string): Promise<GeoNamesCityType[]> => {
	if (value.length < 3) return [];
	const cities = (await fetch(API_PATH + value).then((res) => res.json())) as GeoNamesCityType[];
	return cities;
};

export const citiesStore = (cityInput: Readable<string>) =>
	derivedStore<GeoNamesCityType[]>(cityInput, [], fetchCities, 200);
