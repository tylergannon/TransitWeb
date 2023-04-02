import type { AutoCompleteOption } from '$lib/components/complete/types';
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

type PersonObj = Omit<PersonType, 'userId' | '_id' | 'slug'>;

export const postForm = async (personObj: PersonObj): Promise<Omit<PersonType, 'userId'>> => ({
	...personObj,
	...(await fetch('/app/people', {
		method: 'POST',
		body: new URLSearchParams({
			...personObj,
			dobUtc: personObj.dobUtc.valueOf().toString(),
			tags: personObj.tags.join(','),
			placeId: personObj.placeId.toString()
		})
	}).then((res) => res.json() as Promise<{ _id: string; slug: string }>))
});
