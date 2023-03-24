<script lang="ts">
	import type { PeopleStore } from '$lib/stores/people';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	setContext('userPeople', writable<PeopleStore>(data.people));

</script>

<slot />
