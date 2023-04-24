<script lang="ts">
	import type { GateNumber } from '$lib/hd';
	import type { Linkage, _GateConf } from '$lib/hd/graph';
	import type { Readable } from 'svelte/store';
	import type { GraphTheme } from '$lib/theme';
	import { getContext } from 'svelte';

	export let gate: GateNumber;
	export let ctrDefined: boolean;
	export let x: number;
	export let y: number;
	export let radius: number;
	export let defined: boolean;

	const r = (x: number) => Math.round(x * 100) / 100;
</script>

<g class:open={!ctrDefined} class:defined>
	<circle cx={r(x)} cy={r(y)} r={r(radius)} />
	<text x={r(x)} y={r(y + 2)}>
		{gate}
	</text>
</g>

<style lang="postcss">
	text {
		font-size: var(--pip-font-size);
		/* apply fill-primary-800; */
		text-anchor: middle;
		alignment-baseline: middle;
		z-index: 101;
	}
	g:not(.defined).open > text {
		/* apply fill-primary-400; */
	}

	g.defined, g.open > text {
		/* apply fill-primary-500; */
	}

	g.defined > text {
		/* apply fill-primary-100; */
	}

	g > circle {
		fill: none;
	}
	g.defined > circle {
		/* apply fill-primary-500; */
	}
</style>
