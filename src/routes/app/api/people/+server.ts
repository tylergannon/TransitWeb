import type { RequestHandler } from './$types';
import { Person } from '$lib/srv/model';

export const GET: RequestHandler = async ({ locals }) => {
	// by now we know we're logged in.
	const userId = (await locals.validate())!.userId;
	const myPeople = await Person.find({ userId });
	return new Response(JSON.stringify(myPeople));
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData();
	const person = await Person.create({
		name: formData.get('name') as string,
		userId: (await locals.validate())!.userId,
		dob_utc: new Date(parseInt(formData.get('dob_utc') as string)),
		tags: formData.getAll('tags') as string[],
		tz: formData.get('tz') as string,
		city: formData.get('city') as string,
		cc: formData.get('cc') as string,
		aa1: formData.get('aa1') as string,
		aa2: formData.get('aa2') as string
	});
	return new Response(JSON.stringify(person));
};
