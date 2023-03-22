/**
 * @fileoverview Exports all models and mongoose instance
 * @author @tylergannon
 *
 * Note the conditional creation of new models. This is to prevent
 * conflict during development, between the HMR process repeating the
 * same calls to mongoose.model(), which is not idempotent but throws
 * an error if the model already exists.
 */
import type { Model } from 'mongoose';
import mongooseModule from 'mongoose';

if (globalThis.models === undefined) {
	globalThis.models = {};
}

import type { GeoNamesCityType } from './geoNamesCity';
import type { KeyType } from './key';
import type { PersonType } from './person';
import type { SessionType } from './session';
import type { UserType } from './user';

export type { GeoNamesCityType, KeyType, PersonType, SessionType, UserType };

import { GeoNamesCitySchema } from './geoNamesCity';
import { KeySchema } from './key';
import { PersonSchema } from './person';
import { SessionSchema } from './session';
import { UserSchema } from './user';

const models: Record<string, Model<any>> = global.models;

export const GeoNamesCity: Model<GeoNamesCityType> =
	models.GeoNamesCity ||
	(models.GeoNamesCity = mongooseModule.model('geoNamesCity', GeoNamesCitySchema));
export const Key: Model<KeyType> =
	models.Key || (models.Key = mongooseModule.model('key', KeySchema));
export const Person: Model<PersonType> =
	models.Person || (models.Person = mongooseModule.model('person', PersonSchema));
export const Session: Model<SessionType> =
	models.Session || (models.Session = mongooseModule.model('session', SessionSchema));
export const User: Model<UserType> =
	models.User || (models.User = mongooseModule.model('user', UserSchema));

export const mongoose = mongooseModule;
