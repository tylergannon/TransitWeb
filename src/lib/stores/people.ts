import type { PersonType } from '$lib/srv/model';

export type ClientSidePerson = Omit<PersonType, '_id' | 'userId'> & { _id: string };
export type PeopleStore = Record<string, ClientSidePerson>;
