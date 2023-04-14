<script lang="ts">
	import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';
	import { getContext } from 'svelte';
	import PersonForm from '../../new/PersonForm.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const people = getContext('userPeople') as PeopleStore;

	const submit = (e: CustomEvent<Omit<ClientSidePerson, '_id' | 'slug'>>) => {
		people.update($page.params.slug, e.detail);
		goto('/app/people/' + $page.params.slug);
	};

</script>

<PersonForm
	action="/app/people/{$page.params.slug}/edit"
	person={data.person}
	selectedCity={data.place}
	on:submit={submit}
>
	<svelte:fragment slot="submit">
		Save and return
	</svelte:fragment>
</PersonForm>
