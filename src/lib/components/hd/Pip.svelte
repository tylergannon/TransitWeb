<script lang="ts">
	import type { GateNumber } from "$lib/hd";
	import type { ChannelName, Linkage } from "$lib/hd/graph";
	import { channel } from "$lib/hd/graph";
	import type { Readable } from "svelte/store";
	import type { GraphTheme } from "$lib/theme";
	import { getContext } from "svelte";

	const theme: Readable<GraphTheme> = getContext('theme') as Readable<GraphTheme>;
	const linkage: Readable<Linkage> = getContext('linkage') as Readable<Linkage>;

	export let gate: GateNumber;
	/** Whether or not the center is defined. */
	export let defined: boolean;
	$: ({x, y, radius} = $theme.gates[gate]);
	$: ({rev, dash} = $theme.channels[gate])
	$: sources = $linkage.gates[gate]?.[0] || [];

	$: colors = Array.from(new Set(sources.map(([_, s])=>$linkage.data[s].color)));
	$: console.log("colors", colors, $linkage.data);

	const r = (x: number) => Math.round(x*100)/100;
</script>

<g style:--ctr={dash} class:rev id="pip-{gate}" class="pip gate{gate}" class:open={!defined} class:defined={!!$linkage.gates[gate]}>
	<circle cx={r(x)} cy={r(y)} r={r(radius)} />
	{#if true}
		<g>
		</g>
	{:else if sources}
		<div></div>

	{/if}
	<text x={r(x)} y={r(y+2)} >
		{gate}
	</text>
</g>

<style lang="postcss">
	text {
		font-size: var(--pip-font-size);
		@apply fill-primary-800;
		text-anchor: middle;
		alignment-baseline: middle;
	}

	g.open > text {
		@apply fill-primary-500;
	}

	g.defined > text {
		@apply fill-primary-100;
	}

	.pip.gate54 {
		@apply fill-blue-600;
	}

	g > circle {
		fill: none;
	}
	g.defined > circle {
		@apply fill-primary-500;
	}
</style>