<script lang="ts">
	import { bodyGraphPropsStore, centerArgs, centersArgs, type GateNumber } from '$lib/hd/stores';

	import { gatesConfig } from '$lib/hd/gatePos';
	import { moveAbs, roundedSquare, roundedTriangle } from './roundedPolygon';
	import Pip from './Pip.svelte';
	import { pipPropsStore } from '$lib/hd/graph';
	import type { CenterName } from '$lib/hd/graph';

	export let height = 800;
	export let width = (800 * 5) / 6;

	const { scaled: scaledProps } = bodyGraphPropsStore({
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
		...Object.entries(gatesConfig).flatMap(([center, conf]) => {
			return Object.entries(conf).map(([gate, params]) => {
				return pipPropsStore(
					gate as GateNumber,
					centersProps[center as CenterName],
					params[0],
					params[1]
				);
			});
		})
	];
</script>

<svg width="500" height="600" viewBox="-500 0 1000 1200" xmlns="http://www.w3.org/2000/svg">
	<path d="M{$headProps.x},{$headProps.y} {roundedTriangle($headProps.size * $headProps.scale)}" />
	<path
		d="{moveAbs([$ajnaProps.x, $ajnaProps.y])} {roundedTriangle($ajnaProps.size * $ajnaProps.scale, 180)}"
	/>
	<path
		d="{moveAbs([$throatProps.x,$throatProps.y])} {roundedSquare($throatProps.size * $throatProps.scale)}"
	/>
	<path d="{moveAbs([$gProps.x,$gProps.y])} {roundedSquare($gProps.size * $gProps.scale, 45)}" />
	<path
		d="{moveAbs([$sacralProps.x, $sacralProps.y])} {roundedSquare($sacralProps.size * $sacralProps.scale)}"
	/>
	<path d="{moveAbs([$rootProps.x,$rootProps.y])} {roundedSquare($rootProps.size * $rootProps.scale)}" />
	<path
		d="{moveAbs([$willProps.x, $willProps.y])} {roundedTriangle(
			$willProps.size * $willProps.scale * 0.85,
			15
		)}"
	/>
	<path
		d="{moveAbs([$spleenProps.x, $spleenProps.y])} {roundedTriangle(
			$spleenProps.size * $spleenProps.scale,
			90
		)}"
	/>
	<path d="{moveAbs([$espProps.x, $espProps.y])} {roundedTriangle($espProps.size * $espProps.scale, 270)}" />

</svg>
