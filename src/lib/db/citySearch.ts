import database from '.';
import type { GeonamesCity, GeonamesAdminArea } from './model';
import type { Collection, IndexableType } from 'dexie';

const MIN_ADMIN_PART_LENGTH = 2;

type CityAggregate = {
	[key: string]: Array<GeonamesCity | CityAggregate>;
};

export interface CitySearchResult {
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

	const citiesView = await database.geonamesCities
		.where('nameAscii')
		.startsWithIgnoreCase(cityPart)
		.limit(100)
		.toArray();
	const areaIds = new Set<string>();
	citiesView.forEach((city) => {
		areaIds.add(city.cc);
		areaIds.add(city.admin1);
		areaIds.add(city.admin2);
	});

	const adminAreas = await database.geonamesAdminAreas
		.where('id')
		.anyOf([...areaIds])
		.toArray();

	const adminAreasById = Object.fromEntries(adminAreas.map((a) => [a.id, a]));
	let cities: GeonamesCity[] = citiesView;
	if (adminPart) {
		const q = adminPart.toLowerCase();
		cities = citiesView.filter((city) => {
			return [city.cc, city.admin1, city.admin2].some((id) => {
				const adminArea = adminAreasById[id];
				return adminArea?.nameAscii?.startsWith(q);
			});
		});
	}

	return cities.map((city) => {
		const country = adminAreasById[city.cc];
		const adminArea1 = adminAreasById[city.admin1];
		const adminArea2 = adminAreasById[city.admin2];

		const displayParts = [city.name];

		if (adminArea1 && adminArea1.name !== city.name) {
			displayParts.push(adminArea1.name);
		}

		if (adminArea2 && adminArea2.name !== city.name) {
			displayParts.push(adminArea2.name);
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
}

export default searchCities;
