import type { Actions } from './$types';
import { Person } from '$lib/srv/model';
const NUMBER = /^-?\d+$/;
export const actions = {
	default: async ({ request, locals: { validate } }): Promise<{ slug: string; _id: string }> => {
		/**
		 * We'll take Person data from the request body.  If _id is present we convert it to a Mongo ObjectId
		 * If not, that means we're making a NEW object.
		 */
		const formData = await request.formData();

		const tags = formData.getAll('tags') as string[];
		const dateVal = formData.get('dobUtc') as string;

		return await Person.createPerson({
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			userId: (await validate())!.userId,
			placeId: parseInt(formData.get('placeId') as string),
			dobUtc: new Date(dateVal.match(NUMBER) ? parseInt(dateVal) : Date.parse(dateVal)),
			tz: formData.get('tz') as string,
			tags
		}).then(({ _id, slug }) => ({
			_id: _id.toHexString(),
			slug
		}));
	}
} satisfies Actions;
