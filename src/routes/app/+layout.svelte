<script lang="ts">
	import { peopleStore, type PeopleStore } from '$lib/stores/people';
	import { setContext } from 'svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	setContext('userPeople', peopleStore(data.people));

</script>

<slot />
