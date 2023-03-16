import type * as Kit from '@sveltejs/kit';

type RouteParams = {
	email: string;
	password: string;
	csrfToken: string;
};

export type PageServerLoad = Kit.ServerLoad<RouteParams>;
export type PageLoad = Kit.Load<RouteParams>;
