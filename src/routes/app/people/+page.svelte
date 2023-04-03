<script lang="ts">
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import Person from './Person.svelte';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { AppShell, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
 	const userPeople = getContext('userPeople') as PeopleStore;
  let group = '';

</script>

<h1>Sick</h1>