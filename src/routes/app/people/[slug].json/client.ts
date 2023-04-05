import type { ClientSidePerson } from '$lib/stores/people';

export const fetchPerson = async (
	slug: string,
	_fetch: typeof fetch
): Promise<ClientSidePerson | null> => {
	const res = await _fetch(`/app/people/${slug}.json`);
	if (res.ok) {
		const json: Omit<ClientSidePerson, 'dobUtc'> & { dobUtc: string } = await res.json();
		return {
			...json,
			dobUtc: new Date(Number(json.dobUtc))
		};
	} else if (res.status === 404) {
		return null;
	} else {
		throw new Error(`Error: ${res.status} ${res.statusText}`);
	}
};
