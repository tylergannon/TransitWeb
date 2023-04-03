<script lang="ts">
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import Person from './Person.svelte';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { AppShell, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
 	const userPeople = getContext('userPeople') as PeopleStore;
  let group = '';

</script>
<AppShell slotPageContent="flex-grow" regionPage="flex-grow min-v-screen">
  <svelte:fragment slot="header">
    <AppBar  />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
  <div class="p-4 flex-grow bg-surface-100 dark:bg-surface-800" >
    <div class="flex flex-col space-y-4">
      <input type="search" class="input">
      <ListBox>
        {#each Object.entries($userPeople) as [key, person] (key)}
        <Person {person} bind:group />

        {/each}

      </ListBox>

    </div>
  </div>
  </svelte:fragment>
  <svelte:fragment slot="pageHeader">
    <span class="text-4xl font-semibold mb-4 prose font-serif">People</span>
  </svelte:fragment>
  <!-- Router Slot -->
  <slot />

  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">
  </svelte:fragment>
  <svelte:fragment slot="footer">This is where my feet go.</svelte:fragment>
</AppShell>


