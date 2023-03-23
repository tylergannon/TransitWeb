<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
  import { utcToZonedTime } from 'date-fns-tz';
	import type { PeopleStore } from '$lib/stores/people';
  	const userPeople = getContext('userPeople') as Writable<PeopleStore>;
</script>

<div class="p-4" >
  <h1 class="text-4xl font-semibold mb-4">People</h1>
  <div class="flex flex-col space-y-4">
    {#each Object.entries($userPeople) as [slug, person]}
      <div class="flex flex-row space-x-4">
        <div class="flex flex-col space-y-2">
          <div class="text-2xl font-semibold">
            <a href="/app/people/{slug}">{person.firstName} {person.lastName}</a>
          </div>
          <div class="text-lg">{utcToZonedTime(person.dobUtc, person.tz).toLocaleString()}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
