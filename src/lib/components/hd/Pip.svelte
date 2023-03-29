<script lang="ts">
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
		y={r(y+1)}
		font-size="{r(radius) * 1.3}px"
	>
		{gate}
	</text>
</g>

<style lang="postcss">
	text {
		text-anchor: middle;
		alignment-baseline: middle;
		fill: black;
	}
	circle {
		@apply fill-secondary-500;
		stroke: black;
		stroke-width: 1;
	}
</style>