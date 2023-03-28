import type { PersonType } from '$lib/srv/model';
import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type ClientSidePerson = Omit<PersonType, '_id' | 'userId'> & { _id: string };
export type PersonStore = Writable<ClientSidePerson>;

export interface PeopleStore extends Readable<Record<string, PersonStore>> {
	add(person: ClientSidePerson): void;
	remove(slug: string): void;
}

export const peopleStore = (people: ClientSidePerson[]): PeopleStore => {
	const { update, subscribe } = writable(
		people.reduce((acc, person) => {
			acc[person.slug] = writable(person);
			return acc;
		}, {} as Record<string, PersonStore>)
	);
	return {
		subscribe,
		add(person: ClientSidePerson) {
			update((people) => ({ ...people, [person.slug]: writable(person) }));
		},
		remove(slug: string) {
			update(({ [slug]: _, ...people }) => people);
		}
	};
};
