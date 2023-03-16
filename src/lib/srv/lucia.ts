import lucia from 'lucia-auth';
import mongooseAdapter from '@lucia-auth/adapter-mongoose';
import redisAdapter from '@lucia-auth/adapter-session-redis';

import type { RedisClientType } from '@redis/client';
import { dev } from '$app/environment';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const buildAuth = (redisCli: RedisClientType<any, any, any>) =>
	lucia({
		adapter: {
			user: mongooseAdapter(mongoose),
			session: redisAdapter({ session: redisCli, userSession: redisCli })
		},
		env: dev ? 'DEV' : 'PROD',
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
