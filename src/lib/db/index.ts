import database from './init';

export default database;

import { Database } from './init';
import type { Person, GeonamesAdminArea, GeonamesCity } from './model';

export type { Person, GeonamesAdminArea, GeonamesCity };
export { Database, database };
