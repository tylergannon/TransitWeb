<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';
	import { getContext } from 'svelte';
	import type { ActionData } from './$types';
	import PersonForm from './PersonForm.svelte';
	import type { Readable } from 'svelte/store';

	const showSidebar: Readable<boolean> = getContext('showSidebar');
	$showSidebar = false;

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
	<div class="col-span-4 col-start-2 card-hover p-4">
		<div class="card-header">
			<h3 class="mb-6 text-lg font-semibold text-black dark:text-white">Add A Person</h3>

			<p>
				Each new person you add has a story to tell.  Let's key in to it.
			</p>
			<hr />
		</div>
		<section>
			<PersonForm  action="/app/people/new" on:submit={onSubmit} />
		</section>
	</div>
	<div class="col-span-4" />
</div>

<style lang="postcss">
	h3 {
		@apply mb-1;
	}
	hr {
		@apply border-surface-700 dark:border-surface-200;
		border: 0.01rem solid;
		@apply mb-2;
	}

</style>