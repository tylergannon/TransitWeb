<script lang="ts">
	import type { CenterName } from '$lib/hd';
	import { centers, type Linkage } from '$lib/hd/graph';
	import type { GraphTheme } from '$lib/theme';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import Pip from './Pip.svelte';
	import Channel from './Channel.svelte';

	const theme: Readable<GraphTheme> = getContext('theme');
	const linkage: Readable<Linkage> = getContext('linkage');

	export let name: CenterName;

	$: myChannels = $linkage.centers[name];
	$: myGates = $linkage.gates;
	$: gates = centers[name].gates.map(gate => $theme.gates[gate]);

	const thisCenterGates = centers[name].gates;

</script>
<g class="center-group center-{name}">
	<g>
		{#each thisCenterGates as gate}
			<Channel {gate} />
		{/each}
	</g>
	<use href="#center-{name}" class:def={!!myChannels}  />
	<g class="bg-he">
		{#each thisCenterGates as gate, idx}
			<g class="gate" class:def={!!myGates[gate]}>
			</g>
		{/each}
	</g>
</g>

<style lang="postcss">

	.backing {
		stroke-linecap: butt;
		fill: none;
		stroke-width: 24px;
		opacity: 0.7;
		@apply stroke-blue-900;
	}
	.backing.mask {
		stroke-width: 22px;
		@apply dark:stroke-black stroke-white;
	}

</style>