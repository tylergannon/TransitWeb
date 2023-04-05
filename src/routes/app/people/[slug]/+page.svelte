<script lang="ts">
	import { getContext } from 'svelte';

	import type { PageData } from './$types';
	import type { ClientSidePerson, PeopleStore } from '$lib/stores/people';

	import * as planets from '$lib/images/icons/planets';

	const userPeople = getContext('userPeople') as PeopleStore;
	export let data: PageData;

	let {
		person, chart
	} = data;

	$: {
		if ($userPeople[data.person.slug] === undefined) {
			userPeople.add(person);
		}
	}

	$: person = $userPeople[data.person.slug];

</script>

<div class="text-4xl font-bold p-4">
	{person.firstName}
	{person.lastName}
</div>

<div class="card rounded-md w-14 h-14 p-1">
	<div class="flex flex-row items-center">
		<img src={planets.sun} alt="sun" class="h-4 w-4" />
		<span class="pl-0.5">Sun</span>
	</div>
	<div class="flex flex-row">
		<span class="text-lg">{chart.design.sun[0]}</span>
		<div class="card">

		</div>
	</div>
</div>
