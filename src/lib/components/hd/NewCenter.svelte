<script lang="ts">
	import type { CenterName, CenterDisplayProps } from '$lib/hd/graph';
	import { gatesConfig } from '$lib/hd/gatePos';
	import { moveAbs, roundedSquare, roundedTriangle, roundedTriangleHeight } from './roundedPolygon';
	import Pip from './Pip.svelte';

	export let name: CenterName;
	export let x: number;
	export let y: number;
	export let pipRadius: number;
	export let channelSpace: number;
	export let distFromEdge: number;
	export let shapeSize: number;

	export let scale: number | undefined = undefined;
	export let shape: 'triangle' | 'square' | undefined = undefined;
	export let rotation: number | undefined = undefined;

	$: displayProps = {
		x,
		y,
		scale: scale || 1,
		pipRadius: pipRadius * (scale || 1),
		channelSpace: channelSpace * (scale || 1),
		distFromEdge: distFromEdge * (scale || 1),
		size: shapeSize * (scale || 1),
		height: (shape === 'square' ? shapeSize : roundedTriangleHeight(shapeSize)) * (scale || 1),
		centerDx: (scale || 1) * (2 * pipRadius + channelSpace)
	} as CenterDisplayProps;
</script>

<g class="center-group center-{name}">
	<path
		d="{moveAbs([displayProps.x, displayProps.y])} {(shape === 'square'
			? roundedSquare
			: roundedTriangle)(displayProps.size, rotation)}"
	/>
	<g>
		{#each Object.entries(gatesConfig[name]) as [gate, fns]}
			<Pip
				{gate}
				radius={displayProps.pipRadius}
				x={x + fns[0](displayProps)}
				y={y + fns[1](displayProps)}
			/>
		{/each}
	</g>
</g>
