<script lang="ts">
	export let x: number;
	export let y: number;
	export let radius: number;

	export let gate: string;

</script>

<circle cx={x} cy={y} r={radius} class="fill-secondary-500" stroke="black" stroke-width="1" />
<text
	{x}
	y={y+1}
	font-size="{radius*1.3}px"
	text-anchor="middle"
	alignment-baseline="middle"
	fill="black"
>
	{gate}
</text>
