<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { utcToZonedTime } from 'date-fns-tz';
	import type { PageData } from './$types';
	import type { PeopleStore } from '$lib/stores/people';

	const userPeople = getContext('userPeople') as Writable<PeopleStore>;
	export let data: PageData;
  console.log("My people", data.people)
  console.log("People store", $userPeople)
  console.log(data.person.slug)
  if (!Object.prototype.hasOwnProperty.call($userPeople, data.person.slug)) {
    userPeople.update(people => {
      people[data.person.slug] = data.person
      return people
    })
  }
  $: person = $userPeople[data.person.slug]
  console.log($userPeople)
  console.log("KEYS", Object.keys($userPeople))
  Object.entries($userPeople).forEach(([slug, person]) => {
    console.log(slug, person)
  });

</script>

<div class="p-4">
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
