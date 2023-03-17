import mongoose from 'mongoose';

import { dev } from '$app/environment';

if (dev) {
	console.log('WHATSAD');
	// Delete each model in mongoose.models.
	Object.keys(mongoose.models).forEach((key) => {
		mongoose.deleteModel(key);
		console.log(key);
		if (mongoose.models[key]) {
			delete mongoose.models[key];
		}
	});
}

export type { GeoNamesCityType } from './geoNamesCity';
export type { KeyType } from './key';
export type { PersonType } from './person';
export type { SessionType } from './session';
export type { UserType } from './user';

import { GeoNamesCity } from './geoNamesCity';
import { Key } from './key';
import { Person } from './person';
import { Session } from './session';
import { User } from './user';

export { GeoNamesCity, Key, Person, Session, User };
