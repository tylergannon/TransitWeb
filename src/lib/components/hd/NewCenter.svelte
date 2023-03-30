<script lang="ts">
	import type { CenterName, CenterDisplayProps } from '$lib/hd/graph';
	import { gatesConfig } from '$lib/hd/gatePos';
	import Pip from './Pip.svelte';
	import { SvgPath } from '$lib/svg/path';


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

	const roundedTriangleHeight = (size: number, r = 0.6) =>
		size * (1- (0.134)/(1 + 2 * r))

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
	$: path = (new SvgPath())
		.move([displayProps.x, displayProps.y], "M")
		.rotate(rotation||0)
		[(shape === 'square' ? 'roundedSquare' : 'roundedTriangle')](displayProps.size)
		.toString()

</script>

<g class="center-group center-{name}">
	<path d="{path}" />
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
