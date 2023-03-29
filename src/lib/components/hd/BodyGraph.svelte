<script lang="ts">
	import { bodyGraphProps, centerArgs, centersArgs, type GateNumber } from '$lib/hd/stores';

	import * as pos from '$lib/hd/gatePos';
	import { roundedSquare, roundedTriangle } from './roundedPolygon';
	import Pip from './Pip.svelte';
	import { pipPropsStore } from '$lib/hd/graph';
	import type { CenterName } from '$lib/hd/graph';

	export let height = 800;
	export let width = (800 * 5) / 6;

	const { scaled: scaledProps } = bodyGraphProps({
		channelSpace: 2,
		pipRadius: 16,
		distFromEdge: 5,
		height,
		width,
		scale: 1,
		triangleSize: 150,
		squareSize: 162
	});

	const { args: centers, props: centersProps } = centersArgs(scaledProps, {
		head: centerArgs({ x: 0, y: 80, scale: 1 }),
		ajna: centerArgs({ x: 0, y: 240, scale: 1.2 }),
		throat: centerArgs({ x: 0, y: 420, scale: 1, size: 162 }),
		g: centerArgs({ x: 0, y: 640, scale: 1, size: 162 }),
		sacral: centerArgs({ x: 0, y: 900, scale: 1, size: 162 }),
		root: centerArgs({ x: 0, y: 1100, scale: 1, size: 162 }),
		will: centerArgs({ x: 150, y: 750, scale: 1 }),
		spleen: centerArgs({ x: -300, y: 900, scale: 1, size: 162 }),
		esp: centerArgs({ x: 300, y: 900, scale: 1, size: 162 })
	});
	const {
		head: headProps,
		ajna: ajnaProps,
		throat: throatProps,
		g: gProps,
		sacral: sacralProps,
		root: rootProps,
		will: willProps,
		spleen: spleenProps,
		esp: espProps
	} = centersProps;

	

	const gates = [
		...Object.entries(pos.gatesConfig).flatMap(([center, conf]) => {
			return Object.entries(conf).map(([gate, params]) => {
				return pipPropsStore(gate as GateNumber, centersProps[center as CenterName], params[0], params[1])
			})
		})
	]
</script>

<svg width="500" height="600" viewBox="-500 0 1000 1200" xmlns="http://www.w3.org/2000/svg">
	<path
		transform="translate({$headProps.x},{$headProps.y})"
		d="{roundedTriangle($headProps.size * $headProps.scale)}"
	/>
	<path
		transform="translate({$ajnaProps.x},{$ajnaProps.y}) rotate(180)"
		d="{roundedTriangle($ajnaProps.size * $ajnaProps.scale)}"
	/>
	<path
		transform="translate({$throatProps.x},{$throatProps.y})"
		d="{roundedSquare($throatProps.size * $throatProps.scale, 0.7)}"
	/>
	<path
		transform="translate({$gProps.x},{$gProps.y}) rotate(45)"
		d="{roundedSquare($gProps.size * $gProps.scale, 0.7)}"
	/>
	<path
		transform="translate({$sacralProps.x},{$sacralProps.y})"
		d="{roundedSquare($sacralProps.size * $sacralProps.scale, 0.7)}"
	/>
	<path
		transform="translate({$rootProps.x},{$rootProps.y})"
		d="{roundedSquare($rootProps.size * $rootProps.scale, 0.7)}"
	/>
	<path
		transform="translate({$willProps.x},{$willProps.y}) rotate(15)"
		d="{roundedTriangle($willProps.size * $willProps.scale * 0.85)}"
	/>
	<path
		transform="translate({$spleenProps.x},{$spleenProps.y}) rotate(90)"
		d="{roundedTriangle($spleenProps.size * $spleenProps.scale)}"
	/>
	<path
		transform="translate({$espProps.x},{$espProps.y}) rotate(270)"
		d="{roundedTriangle($espProps.size * $espProps.scale)}"
	/>

	{#each gates as gate}
		<Pip props={gate} />
	{/each}
</svg>
