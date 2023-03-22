import type { Database } from './init';
import type { Table } from 'dexie';

// import { gunzip as _gunzip, strFromU8 } from 'fflate'

const CHUNK_SIZE = 500;
const chunk = <T>(input: T[], size: number = CHUNK_SIZE) => {
	return input.reduce((arr, item, idx) => {
		return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
	}, [] as T[][]);
};

async function loadDataFile<T extends { id: V }, U, V = string | number>(
	path: string,
	table: Table<T, U>,
	tx: (line: string[]) => T
) {
	const ids = new Set<any>();
	const lines = await fetch(path)
		.then((x) => x.text())
		.then((x) => x.split('\n'));
	for (const batch of chunk(lines)) {
		const newRecords = batch
			.map((x) => x.split('\t'))
			.map(tx)
			.filter((x) => {
				if (ids.has(x.id)) {
					return false;
				} else {
					ids.add(x.id);
					return !!x.id;
				}
			});
		try {
			await table.bulkAdd(newRecords);
		} catch (err) {
			console.error(err);
			console.log(newRecords);
			throw err;
		}
	}
	console.log(
		`Loaded ${lines.length} records from ${path}. ${lines.length - ids.size} collisions.`
	);
}

export async function loadInitialData(db: Database) {
	const cityCount = await db.geonamesCities.count();
	const adminCount = await db.geonamesAdminAreas.count();
	const start = Date.now();
	if (adminCount !== 0) {
		console.log(`Already have ${adminCount} admin areas.`);
	} else {
		console.log('Loading admin areas.');
		await loadDataFile(
			'/cities/admin-areas.tsv.gz',
			db.geonamesAdminAreas,
			([id, name, nameAscii]) => ({ id, name, nameAscii: nameAscii?.toLowerCase() })
		);
		console.log('Done.');
	}
	if (cityCount !== 0) {
		console.log(`Cities collection already populated with ${cityCount}.`);
	} else {
		console.log('Loading cities.');
		await loadDataFile(
			'/cities/cities500.tsv.gz',
			db.geonamesCities,
			([id, name, nameAscii, _, __, cc, admin1, admin2, tz]) => {
				const ac1 = cc + '.' + admin1;
				const ac2 = ac1 + '.' + admin2;
				return { id: parseInt(id), name, nameAscii: nameAscii?.toLowerCase(), cc, ac1, ac2, tz };
			}
		);
		console.log('Populating admin area names.');
		db.geonamesCities.each((city) => {
			const p1 = city.ac1 ? db.geonamesAdminAreas.get(city.ac1) : Promise.resolve(null);
			const p2 = city.ac2 ? db.geonamesAdminAreas.get(city.ac2) : Promise.resolve(null);
			const country = city.cc ? db.geonamesAdminAreas.get(city.cc) : Promise.resolve(null);

			Promise.all([p1, p2, country]).then(([a1, a2, c]) => {
				db.geonamesCities.update(city.id, {
					aa1: a1?.nameAscii.toLowerCase(),
					aa2: a2?.nameAscii.toLowerCase(),
					country: c?.nameAscii.toLowerCase()
				});
			});
		});
		console.log(`Loaded ${cityCount} cities in ${Date.now() - start}ms.`);
		console.log('Done.');
	}
}
