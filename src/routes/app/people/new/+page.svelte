<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';
	import { getContext } from 'svelte';
	import type { ActionData } from './$types';
	import PersonForm from './PersonForm.svelte';

	afterNavigate(() => {
		(document.querySelector('input[name="firstName"]') as null|HTMLInputElement)?.focus();
	});

	export let form: ActionData;

	const onSubmit = (e: CustomEvent<Omit<ClientSidePerson, "_id"|"slug">>) => {
		const person = e.detail;
		const f = form as NonNullable<ActionData>;
		people.add({
			...f,
			...person,
		});
		goto("/app/people/" + f.slug);
	}

	const people = getContext('userPeople') as PeopleStore;

</script>


<div class="grid grid-cols-6">
	<div class="card col-span-4 col-start-2 card-hover p-4">
		<div class="card-header">
			<h3 class="mb-6 text-xl font-semibold">New Record</h3>
		</div>
		<section>
			<PersonForm  action="/app/people/new" on:submit={onSubmit} />
		</section>
	</div>
	<div class="col-span-4" />
</div>

