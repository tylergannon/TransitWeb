// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { RedisClientType } from '@redis/client';
import type { Model } from 'mongoose';
import type { ValidationErrors } from 'svelte-use-form';

declare global {
	declare var models: Record<string, Model<any>>; // eslint-disable-line no-var
	namespace App {
		// interface Error {}

		interface Locals {
			redisClient: RedisClientType;
			auth: Lucia.Auth;
		}
		interface PageData {
			session?: Session;
			user?: {
				name: string;
				email: string;
				image?: string;
			};
		}
		// interface Platform {}
	}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('./lib/srv/lucia').Auth;
	type UserAttributes = {
		email: string;
		name: string;
	};
}

export {};
