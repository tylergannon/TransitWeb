<script lang="ts">
	import type { PipProps } from "$lib/hd/graph";
	import type { Readable } from "svelte/store";

	export let props: Readable<PipProps>

	export let gate: string;
</script>

<circle cx={$props.x} cy={$props.y} r={$props.radius} class="fill-secondary-500" stroke="black" stroke-width="1" />
<text
	x={$props.x}
	y={$props.y+1}
	font-size="{$props.radius*1.3}px"
	text-anchor="middle"
	alignment-baseline="middle"
	fill="black"
>
	{gate}
</text>
