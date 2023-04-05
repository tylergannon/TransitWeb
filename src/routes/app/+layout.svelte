<script lang="ts">
	import { peopleStore } from '$lib/stores/people';
	import { setContext } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	setContext(
		'userPeople',
		peopleStore(
			data.people.map((person) => ({
				...person,
				dobUtc: new Date(parseInt(person.dobUtc))
			}))
		)
	);
</script>

<slot />
