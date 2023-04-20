import type { PersonType } from '$lib/srv/model';
import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

export type ClientSide<T extends { _id: any }> = Omit<T, '_id'> & { _id: string };
export type ClientSidePerson = Omit<ClientSide<PersonType>, 'userId'>;

export type PersonStore = ClientSidePerson;

export interface PeopleStore extends Readable<Record<string, ClientSidePerson>> {
	add(person: ClientSidePerson): void;
	remove(slug: string): void;
	update(slug: string, params: Partial<ClientSidePerson>): void;
}

export const peopleStore = (people: ClientSidePerson[]): PeopleStore => {
	const { update, subscribe } = writable(
		Object.fromEntries(people.map((person) => [person.slug, person]))
	);
	return {
		subscribe,
		add(person: ClientSidePerson) {
			update((people) => ({ ...people, [person.slug]: person }));
		},
		remove(slug: string) {
			update(({ [slug]: _, ...people }) => people);
		},
		update(slug: string, params: Partial<ClientSidePerson>) {
			update((people) => {
				people[slug] = { ...people[slug], ...params };
				return people;
			});
		}
	};
};
