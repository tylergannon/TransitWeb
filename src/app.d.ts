// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { RedisClientType, RedisModules, RedisFunctions, RedisScripts } from '@redis/client';
import type { Model } from 'mongoose';
import type { ValidationErrors } from 'svelte-use-form';
import type { Validate, ValidateUser, SetSession } from '@lucia-auth/sveltekit';
import type { LuciaContext } from '@lucia-auth/sveltekit/types';
import type { ObjectId } from 'mongodb';
declare global {
	var models: Record<string, Model<any>>; // eslint-disable-line no-var
	namespace App {
		// interface Error {}

		interface Locals {
			redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
			auth: Lucia.Auth;
			validate: Validate;
			setSession: SetSession;
			validateUser: ValidateUser;
		}
		interface PageData {
			session?: Session;
			user?: {
				name: string;
				email: string;
				image?: string;
			};
			_lucia?: LuciaContext;
		}
		// interface Platform {}
	}

	declare namespace Lucia {
		type Auth = import('./lib/srv/lucia').Auth;
		type UserAttributes = {
			firstName: string;
			lastName: string;
			profile_img: string;
			dob_utc: Date;
			tz: string;
			birthplace: import('mongodb').ObjectId;
			createdAt: Date;
		};
	}
}

export {};
