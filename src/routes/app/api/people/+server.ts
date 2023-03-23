import type { RequestHandler } from './$types';
import { Person } from '$lib/srv/model';

export const POST: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData();
	const tags = formData.get('tags') as string;

	const person = await Person.create({
		firstName: formData.get('firstName') as string,
		lastName: formData.get('lastName') as string,
		userId: (await locals.validate())!.userId,
		placeId: parseInt(formData.get('placeId') as string),
		dobUtc: Date.parse(formData.get('dobUtc') as string),
		tz: formData.get('tz') as string,
		tags: tags ? tags.split(',').map((a) => a.trim()) : []
	});
	return new Response(JSON.stringify(person));
};
