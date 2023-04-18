<script lang="ts">
	import { getContext } from 'svelte';

	import type { PageData } from './$types';
	import type { PeopleStore } from '$lib/stores/people';

	import * as planets from '$lib/images/icons/planets';
	import { hexagram, planetNames } from '$lib/hd';
	import Graph from '$lib/components/hd/Graph.svelte';

	const userPeople = getContext('userPeople') as PeopleStore;
	export let data: PageData;

	$: person = data.person;
	$: design = data.chart.design;
	$: natal = data.chart.natal;
	$: charts = [
		{
			chart: data.chart.design,
			name: "design",
			displayName: "Design",
			color: "stroke-primary-500",
		}, {
			chart: data.chart.natal,
			name: "natal",
			displayName: "Natal",
			color: "stroke-secondary-500",
		}
	]

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
	<Graph width={400} {charts} />
	<div
		class="w-4/6 grid lg:grid-cols-[repeat(14,_minmax(0,_1fr))] md:grid-cols-[repeat(7,_minmax(0,_1fr))] sm:grid-cols-4 gap-0"
	>
		{#each planetNames as planet}
			<div class="planet">
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
					>{design[planet]?.gate}<sup class="text-xs font-light"
						>{design[planet]?.line}</sup
					></div
				>
				<div class="text-lg font-heading-token font-semibold text-center"
					>{natal[planet]?.gate}<sup class="text-xs font-light"
						>{natal[planet]?.line}</sup
					></div
				>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.planet {
		@apply bg-secondary-100 dark:bg-secondary-900 p-2 md:mb-2 items-center;
	}
</style>