<script lang="ts">
	import { getContext } from 'svelte';

	import type { PageData } from './$types';
	import type { PeopleStore } from '$lib/stores/people';

	import * as planets from '$lib/images/icons/planets';
	import { hexagram, planetNames } from '$lib/hd/chart';
	import Hexagram from '$lib/components/hd/Hexagram.svelte';
	import Graph from '$lib/components/hd/Graph.svelte';

	const userPeople = getContext('userPeople') as PeopleStore;
	export let data: PageData;

	$: person = data.person;
	$: chart = data.chart;

	$: {
		if ($userPeople[data.person.slug] === undefined) {
			userPeople.add(person);
		}
	}
</script>

<div class="text-4xl font-bold p-4">
	{person.firstName}
	{person.lastName}
</div>
<div class="flex flex-col relative">
	<Graph width={400} />
	<div
		class="w-4/6 grid lg:grid-cols-[repeat(14,_minmax(0,_1fr))] md:grid-cols-[repeat(7,_minmax(0,_1fr))] sm:grid-cols-4 gap-0"
	>
		{#each planetNames as planet}
			<div class="bg-slate-300 dark:bg-slate-800 p-2 md:mb-2 item-center">
				<div class="self-center items-center h-4 w-full mb-1">
					<svelte:component this={planets[planet]} />
				</div>
				<!--
				<svg class="w-3 h-3" viewBox="0 0 100 110">
					<Hexagram gateNumber={chart.natal[planet]?.gate ||"1"}
						width={100} cX={50} cY={50}
					/>
				</svg>
				-->
				<div class="text-lg font-heading-token font-semibold text-center"
					>{chart.design[planet]?.gate}<sup class="text-xs font-light"
						>{chart.design[planet]?.line}</sup
					></div
				>
				<div class="text-lg font-heading-token font-semibold text-center"
					>{chart.natal[planet]?.gate}<sup class="text-xs font-light"
						>{chart.natal[planet]?.line}</sup
					></div
				>
			</div>
		{/each}
	</div>
</div>
