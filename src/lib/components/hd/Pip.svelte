<script lang="ts">
	import { fontPipRatio } from "$lib/theme/props";

	export let x: number;
	export let y: number;
	export let radius: number;
	export let gate: string;
	const r = (x: number) => Math.round(x*100)/100;
</script>

<g class="pip" id="pip-{gate}">
	<circle cx={r(x)} cy={r(y)} r={r(radius)} />
	<text
		x={r(x)}
		y={r(y+2)}
		font-size="{r(radius) * fontPipRatio}px"
	>
		{gate}
	</text>
</g>

<style lang="postcss">
	text {
		@apply fill-blue-500;
		text-anchor: middle;
		alignment-baseline: middle;
	}
	g > circle {
		@apply stroke-blue-600;
		fill: none;
		stroke-width: 2;
	}
</style>