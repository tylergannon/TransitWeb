import { Person } from '$lib/srv/model';
import type { RequestHandler } from './$types';
const nobody = { userId: '-1' };

export const DELETE: RequestHandler = async ({ params, locals: { validate } }) => {
	const { userId } = (await validate()) || nobody;
	const { slug } = params;
	Person.deleteOne({});
	return Person.deleteOne({ slug, userId }).then(({ deletedCount }) =>
		deletedCount === 1 ? new Response('') : new Response('Not Found', { status: 404 })
	);
};
