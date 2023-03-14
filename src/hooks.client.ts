import db from './lib/db/init';
import { loadInitialData } from './lib/db/load';

loadInitialData(db);
