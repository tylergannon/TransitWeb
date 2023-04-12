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
	// Decide whether we're printing any channel, gate activation, or neither.
	const skip = {"10_20": true, "20_34": true, "34_57": true, "10_57": true}
	const isFunny = (ch: ChannelName): ch is "10_20"|"20_34"|"34_57"|"10_57" => !(ch in skip);

	$: sources = $linkage.gates[gate]?.[0];
	$: channels = $linkage.gates[gate]?.[1].map(name=>{
		if (!isFunny(name)) {
			return {
				name,
				paired: $theme.gates[channel(name).gates.find(g=>g!==gate) as GateNumber],
			}
		}
	})
	
	$: g = channels?.[0];


	const r = (x: number) => Math.round(x*100)/100;
</script>

<g id="pip-{gate}" class="pip gate{gate}" class:open={!defined} class:defined={!!$linkage.gates[gate]}>
	<circle cx={r(x)} cy={r(y)} r={r(radius)} />
	{#if channels}
		<g>
		</g>
	{:else if sources}
		<div></div>
s
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