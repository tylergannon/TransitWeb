export const deletePerson = (person: { slug: string }) =>
	fetch(`/app/people/${person.slug}`, { method: 'DELETE' });
