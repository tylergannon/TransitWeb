import lucia from 'lucia-auth';
import mongooseAdapter from './lucia-auth/mongoose';
import redisAdapter from './lucia-auth/redis';

import type { RedisClientType } from '@redis/client';
import { dev } from '$app/environment';
import bcrypt from 'bcrypt';
import type { UserType, mongoose as _mongoose } from '$lib/srv/model';

export const buildAuth = (redisCli: RedisClientType<any, any, any>, mongoose: typeof _mongoose) =>
	lucia({
		adapter: {
			user: mongooseAdapter(mongoose),
			session: redisAdapter({ session: redisCli, userSession: redisCli })
		},
		env: dev ? 'DEV' : 'PROD',
		transformUserData(userData) {
			return userData;
		},
		hash: {
			generate: async (password) => {
				const salt = await bcrypt.genSalt(10);
				return await bcrypt.hash(password, salt);
			},
			validate: async (password, hash) => {
				return await bcrypt.compare(password, hash);
			}
		},
		csrfProtection: false
	});

export type Auth = ReturnType<typeof buildAuth>;
