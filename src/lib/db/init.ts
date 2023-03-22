import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { GeonamesCity, GeonamesAdminArea } from './model';

export class Database extends Dexie {
	geonamesCities!: Table<GeonamesCity, number>;
	geonamesAdminAreas!: Table<GeonamesAdminArea, string>;

	constructor() {
		super('transithd');
		this.version(1).stores({
			geonamesCities: 'id,nameAscii,country,aa1,aa2',
			geonamesAdminAreas: 'id'
		});
	}
}

const database = new Database();
export default database;
