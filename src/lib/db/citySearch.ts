import database from '.';
import type { GeonamesCity, GeonamesAdminArea } from './model';
import type { Collection, IndexableType } from 'dexie';

const MIN_ADMIN_PART_LENGTH = 2;

type CityAggregate = {
	[key: string]: Array<GeonamesCity | CityAggregate>;
};

interface CitySearchResult {
	id: number;
	tz: string;
	display: string;
}

const isCity = (city: GeonamesCity | CityAggregate): city is GeonamesCity => {
	return (city as GeonamesCity).name !== undefined;
};

async function filterCities(
	collection: Collection<GeonamesCity>,
	adminPart: string | null
): Promise<Collection<GeonamesCity, IndexableType>> {
	if (!adminPart || adminPart.length < MIN_ADMIN_PART_LENGTH) return collection;

	const matchingAdminAreas = await database.geonamesAdminAreas
		.where('nameAscii')
		.startsWithIgnoreCase(adminPart)
		.toArray();

	const matchingAdminAreaIds = new Set(matchingAdminAreas.map((a) => a.id));

	return collection.and((city) => {
		const countryMatch = matchingAdminAreaIds.has(city.cc);
		const adminArea1Match = matchingAdminAreaIds.has(city.cc + '.' + city.admin1);
		const adminArea2Match = matchingAdminAreaIds.has(
			city.cc + '.' + city.admin1 + '.' + city.admin2
		);

		return countryMatch || adminArea1Match || adminArea2Match;
	});
}

async function searchCities(query: string, limit = 20): Promise<CitySearchResult[]> {
	const [cityPart, adminPart] = query.split(',').map((s) => s.trim());

	const cities = await filterCities(
		database.geonamesCities.where('nameAscii').startsWithIgnoreCase(cityPart),
		adminPart
	).then((c) => c.limit(limit).toArray());

	const adminAreasIds = cities.reduce((acc, city) => {
		const ids = [city.cc];
		ids.push(city.cc + '.' + city.admin1);
		ids.push(ids[1] + '.' + city.admin2);
		for (const id of ids) {
			if (!acc[id]) acc[id] = 0;
			acc[id]++;
		}
		return acc;
	}, {} as Record<string, number>);

	const adminAreas = await database.geonamesAdminAreas
		.where('id')
		.anyOf(Object.keys(adminAreasIds))
		.toArray();

	const adminAreasById = Object.fromEntries(adminAreas.map((a) => [a.id, a]));

	const results: CitySearchResult[] = cities.map((city) => {
		const country = adminAreasById[city.cc];
		const adminArea1 = adminAreasById[city.cc + '.' + city.admin1];
		const adminArea2 = adminAreasById[city.cc + '.' + city.admin1 + '.' + city.admin2];

		const displayParts = [city.name];

		if (adminArea2 && adminArea2.name !== city.name) {
			displayParts.push(adminArea2.name);
		}

		if (adminArea1 && adminArea1.name !== city.name) {
			displayParts.push(adminArea1.name);
		}

		if (country) {
			displayParts.push(country.name);
		}

		const display = displayParts.join(', ');

		return {
			id: city.id!,
			tz: city.tz,
			display
		};
	});

	return results;
}

export default searchCities;
