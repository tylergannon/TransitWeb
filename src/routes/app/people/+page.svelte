<script lang="ts">
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import Person from './Person.svelte';
 	const userPeople = getContext('userPeople') as PeopleStore;

</script>

<div class="p-4" >
  <h1 class="text-4xl font-semibold mb-4">People</h1>
  <div class="flex flex-col space-y-4">
    {#each Object.values($userPeople) as person}
      <Person {person} />
    {/each}
  </div>
</div>
