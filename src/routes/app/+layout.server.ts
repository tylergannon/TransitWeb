import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = null;
	if (session === null) return { session: null };

	return {};
};
