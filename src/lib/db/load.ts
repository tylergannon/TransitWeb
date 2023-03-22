import type { Database } from './init';
import type { Table } from 'dexie';

// import { gunzip as _gunzip, strFromU8 } from 'fflate'

const CHUNK_SIZE = 500;
const chunk = <T>(input: T[], size: number = CHUNK_SIZE) => {
	return input.reduce((arr, item, idx) => {
		return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
	}, [] as T[][]);
};

// function gunzip(fileData: Uint8Array) {
//   return new Promise<Uint8Array>((resolve, reject) => {
//     _gunzip(
//       fileData,
//       { consume: true },
//       (err, data) => err === null ? resolve(data) : reject(err)
//     )
//   })
// }
//
// async function fetchAndGunzip( path: string ) : Promise<string> {
//   const arrayBuffer = await fetch(path).then(x => x.arrayBuffer())
//   return gunzip( new Uint8Array(arrayBuffer)).then(strFromU8)
// }

async function loadDataFile<T, U>(path: string, table: Table<T, U>, tx: (line: string[]) => T) {
	const lines = await fetch(path)
		.then((x) => x.text())
		.then((x) => x.split('\n'));
	for (const batch of chunk(lines)) {
		const newRecords = batch.map((x) => x.split('\t')).map(tx);
		await table.bulkAdd(newRecords);
	}
}

export async function loadInitialData(db: Database) {
	const cityCount = await db.geonamesCities.count();
	if (cityCount !== 0) {
		console.log(`Cities collection already populated with ${cityCount}.`);
	} else {
		console.log('Loading cities.');
		await loadDataFile(
			'/cities/cities500.tsv.gz',
			db.geonamesCities,
			([name, nameAscii, cc, admin1, admin2, tz]) => ({
				name,
				nameAscii,
				cc,
				admin1: cc + '.' + admin1,
				admin2: cc + '.' + admin1 + '.' + admin2,
				tz
			})
		);
		console.log('Done.');
	}
	const adminCount = await db.geonamesAdminAreas.count();
	if (adminCount !== 0) {
		console.log(`Already have ${adminCount} admin areas.`);
	} else {
		console.log('Loading admin areas.');
		await loadDataFile(
			'/cities/admin-areas.tsv.gz',
			db.geonamesAdminAreas,
			([id, name, nameAscii]) => ({ id, name, nameAscii })
		);
		console.log('Done.');
	}
}
