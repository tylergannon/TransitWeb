<script lang="ts">
	import { getContext } from 'svelte';

	import type { PageData } from './$types';
	import type { PeopleStore } from '$lib/stores/people';

	import * as planets from '$lib/images/icons/planets';
	import { hexagram, planetNames } from '$lib/hd';
	import Graph from '$lib/components/hd/Graph.svelte';
	import { Popup } from '$lib/components/presentation/popup';

	const userPeople = getContext('userPeople') as PeopleStore;
	export let data: PageData;

	$: person = data.person;
	$: design = data.chart.design;
	$: natal = data.chart.natal;
	$: charts = [
		{
			chart: data.chart.design,
			name: 'design',
			displayName: 'Design',
			color: 'stroke-primary-500'
		},
		{
			chart: data.chart.natal,
			name: 'natal',
			displayName: 'Natal',
			color: 'stroke-secondary-500'
		}
	];

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
			{@const planetPopup = new Popup({
				placement: 'right-end',
				offset: { mainAxis: 4, crossAxis: -20 }
			})}
			{@const natalPopup = new Popup({
				placement: 'right-end',
				offset: { mainAxis: 4, crossAxis: -20 }
			})}
			{@const designPopup = new Popup({
				placement: 'right-end',
				offset: { mainAxis: 4, crossAxis: -20 }
			})}

			<div class="planet">
				<div
					class="self-center items-center h-4 w-full mb-1"
					on:mouseenter={planetPopup.show}
					on:mouseleave={planetPopup.hide}
					use:planetPopup.target
				>
					<svelte:component this={planets[planet]} />
					<aside class="context" use:planetPopup.floating>
						<div class="text-lg font-bold">{planet}</div>
					</aside>
				</div>
				<!--
				<svg class="w-3 h-3" viewBox="0 0 100 110">
					<Hexagram gateNumber={chart.natal[planet]?.gate ||"1"}
						width={100} cX={50} cY={50}
					/>
				</svg>
				-->
				<div
					class="text-md font-heading-token font-semibold text-center"
					on:mouseenter={designPopup.show}
					on:mouseleave={designPopup.hide}
					use:designPopup.target
				>
					{design[planet]?.gate}<sup class="text-xs font-light">{design[planet]?.line}</sup>
				</div>
				<aside class="context" use:designPopup.floating>
					<div class="text-lg font-bold">{planet}</div>
					<div class="text-sm font-light">{design[planet]?.gate}</div>
					<div class="text-sm font-light">{design[planet]?.line}</div>
				</aside>
				<div class="text-md font-heading-token font-semibold text-center"
					on:mouseenter={natalPopup.show}
					on:mouseleave={natalPopup.hide}
					use:natalPopup.target
					>
					{natal[planet]?.gate}<sup class="text-xs font-light">{natal[planet]?.line}</sup>
				</div>
				<aside class="context" use:natalPopup.floating>
					<div class="text-lg font-bold">{planet}</div>
					<div class="text-sm font-light">{natal[planet]?.gate}</div>
					<div class="text-sm font-light">{natal[planet]?.line}</div>
				</aside>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	aside {
		position: absolute;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

		&:global(.show) {
			opacity: 100%;
			visibility: visible;
			overflow: visible;
			border-radius: 0.5rem;
			/* apply bg-secondary-100 dark:bg-surface-800 p-2 rounded-lg; */
			/* apply drop-shadow-md; */
		}
	}
	.planet {
		/* apply bg-secondary-50 dark:bg-secondary-900 p-2 md:mb-2 items-center; */
	}
</style>
