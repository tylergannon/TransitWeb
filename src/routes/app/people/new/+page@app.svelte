<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';
	import { getContext } from 'svelte';
	import type { ActionData } from './$types';
	import PersonForm from './PersonForm.svelte';
	import AppBar from '$lib/elem/AppBar.svelte';

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

<AppBar />

<div class="grid grid-cols-10 md:mt-8 lg:mt-10">
	<div class="col-span-8 max-sm:col-span-10 col-start-2 max-sm:col-start-auto p-4 max-sm:p-1">
		<div class="card-header max-sm:p-2">
			<h1 class="mb-6 font-semibold text-black dark:text-white">Add A Person</h1>

			<p>
				Each new person you add has a story to tell.  Let's key in to it.
			</p>
			<hr />
		</div>
		<section class="p-4 xs:p-1">
			<PersonForm  action="/app/people/new" on:submit={onSubmit} />
		</section>
	</div>
	<div class="col-span-4" />
</div>

<style lang="postcss">
	hr {
		/* apply border-surface-700 dark:border-surface-200; */
		border: 0.01rem solid;
		/* apply mb-2; */
	}

</style>
