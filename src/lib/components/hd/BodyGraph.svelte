<script lang="ts">
	import { bodyGraphProps, centerArgs, centersArgs } from '$lib/hd/stores';

	import Center from './Center.svelte';

	import * as pos from '$lib/hd/gatePos';
	import { roundedSquare, roundedTriangle } from './roundedPolygon';
	import Pip from './Pip.svelte';
	import {
		CENTER_GATES,
		pipProps,
		pipPropsStore,
		type CenterDisplayProps,
		type CenterName,
		type PipProps
	} from '$lib/hd/graph';
	import type { Readable } from 'svelte/store';

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

	const fact =
		(n: number): ((p: CenterDisplayProps) => number) =>
		({ size }) =>
			size * n;

	const { args: centers, props: centersProps } = centersArgs(scaledProps, {
		head: centerArgs({ x: 0, y: 80, scale: 1 }),
		ajna: centerArgs({ x: 0, y: 240, scale: 1 }),
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
	const headGates = {
		'64': pipPropsStore(headProps, pos.leftChannelX, pos.triangleBottomY),
		'61': pipPropsStore(headProps, pos.middleChannelY, pos.triangleBottomY),
		'63': pipPropsStore(headProps, pos.rightChannelX, pos.triangleBottomY)
	};
	const ajnaGates = {
		'47': pipPropsStore(ajnaProps, pos.leftChannelX, pos.triangleTopY),
		'24': pipPropsStore(ajnaProps, pos.centerChannelX, pos.triangleTopY),
		'4': pipPropsStore(ajnaProps, pos.rightChannelX, pos.triangleTopY),
		'17': pipPropsStore(ajnaProps, pos.leftChannelX, fact(0.1)),
		'43': pipPropsStore(ajnaProps, pos.centerChannelX, pos.triangleBottomY),
		'11': pipPropsStore(ajnaProps, pos.rightChannelX, fact(0.1))
	};
	const throatGates = {
		'62': pipPropsStore(throatProps, pos.leftChannelX, pos.top),
		'23': pipPropsStore(throatProps, pos.centerChannelX, pos.top),
		'56': pipPropsStore(throatProps, pos.rightChannelX, pos.top),
		'16': pipPropsStore(throatProps, pos.left, pos.topChannelY),
		'20': pipPropsStore(throatProps, pos.left, pos.middleChannelY),
		'35': pipPropsStore(throatProps, pos.right, pos.topChannelY),
		'12': pipPropsStore(throatProps, pos.right, pos.middleChannelY),
		'45': pipPropsStore(throatProps, pos.right, pos.bottomChannelY),
		'31': pipPropsStore(throatProps, pos.leftChannelX, pos.bottom),
		'8': pipPropsStore(throatProps, pos.centerChannelX, pos.bottom),
		'33': pipPropsStore(throatProps, pos.rightChannelX, pos.bottom)
	};
	const gGates = {
		'7': pipPropsStore(gProps, pos.leftChannelX, fact(-0.3)),
		'1': pipPropsStore(gProps, pos.centerChannelX, fact(-0.45)),
		'13': pipPropsStore(gProps, pos.rightChannelX, fact(-0.3)),
		'15': pipPropsStore(gProps, pos.leftChannelX, fact(0.3)),
		'2': pipPropsStore(gProps, pos.centerChannelX, fact(0.45)),
		'46': pipPropsStore(gProps, pos.rightChannelX, fact(0.3)),
		'10': pipPropsStore(gProps, fact(-0.45), pos.middleChannelY),
		'25': pipPropsStore(gProps, fact(0.45), pos.middleChannelY)
	};
	const sacralGates = {
		'5': pipPropsStore(sacralProps, pos.leftChannelX, pos.top),
		'14': pipPropsStore(sacralProps, pos.centerChannelX, pos.top),
		'29': pipPropsStore(sacralProps, pos.rightChannelX, pos.top),
		'34': pipPropsStore(sacralProps, pos.left, pos.topChannelY),
		'27': pipPropsStore(sacralProps, pos.left, pos.bottomChannelY),
		'59': pipPropsStore(sacralProps, pos.right, pos.bottomChannelY),
		'42': pipPropsStore(sacralProps, pos.leftChannelX, pos.bottom),
		'3': pipPropsStore(sacralProps, pos.centerChannelX, pos.bottom),
		'9': pipPropsStore(sacralProps, pos.rightChannelX, pos.bottom)
	};
	const rootGates = {
		'53': pipPropsStore(rootProps, pos.leftChannelX, pos.top),
		'60': pipPropsStore(rootProps, pos.centerChannelX, pos.top),
		'52': pipPropsStore(rootProps, pos.rightChannelX, pos.top),
		'54': pipPropsStore(rootProps, pos.left, pos.topChannelY),
		'38': pipPropsStore(rootProps, pos.left, pos.middleChannelY),
		'58': pipPropsStore(rootProps, pos.left, pos.bottomChannelY),
		'19': pipPropsStore(rootProps, pos.right, pos.topChannelY),
		'39': pipPropsStore(rootProps, pos.right, pos.middleChannelY),
		'41': pipPropsStore(rootProps, pos.right, pos.bottomChannelY)
	};
	const willGates = {
		'21': pipPropsStore(willProps, fact(0), fact(-0.24)),
		'51': pipPropsStore(willProps, fact(-0.15), fact(-0.1)),
		'26': pipPropsStore(willProps, fact(-0.3), fact(0.04)),
		'40': pipPropsStore(willProps, fact(0.2), fact(0.26))
	};
	const spleenGates = {
		'50': pipPropsStore(spleenProps, pos.right, pos.middleChannelY),
		'48': pipPropsStore(spleenProps, fact(-0.2), fact(-0.36)),
		'57': pipPropsStore(spleenProps, fact(0), fact(-0.27)),
		'44': pipPropsStore(spleenProps, fact(0.2), fact(-0.17)),
		'32': pipPropsStore(spleenProps, fact(0.2), fact(0.17)),
		'28': pipPropsStore(spleenProps, fact(0), fact(0.27)),
		'18': pipPropsStore(spleenProps, fact(-0.2), fact(0.36))
	};
	const espGates = {
		'6': pipPropsStore(espProps, pos.left, pos.middleChannelY),
		'36': pipPropsStore(espProps, fact(0.2), fact(-0.36)),
		'22': pipPropsStore(espProps, fact(0), fact(-0.27)),
		'37': pipPropsStore(espProps, fact(-0.2), fact(-0.17)),
		'49': pipPropsStore(espProps, fact(-0.2), fact(0.17)),
		'55': pipPropsStore(espProps, fact(0), fact(0.27)),
		'30': pipPropsStore(espProps, fact(0.2), fact(0.36))
	};
</script>

<svg width="500" height="600" viewBox="-500 0 1000 1200" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<path id="triangle" d={roundedTriangle($scaledProps.triangleSize)} />
		<path id="square" d={roundedSquare(($scaledProps.squareSize * 162) / 150, 0.7)} />
	</defs>
	<!--Head-->
	<Center props={$headProps} gates={headGates}>
		<use href="#triangle" fill="none" stroke="red" />
	</Center>

	<Center props={$ajnaProps} gates={ajnaGates}>
		<use href="#triangle" transform="rotate(180)" fill="none" stroke="red" />
	</Center>

	<Center props={$throatProps} gates={throatGates}>
		<path d={roundedSquare($throatProps.size)} fill="none" stroke="red" />
		<!-- <use href="#square" fill="none" stroke="red" /> -->
	</Center>

	<Center props={$gProps} gates={gGates}>
		<path d={roundedSquare($gProps.size)} transform="rotate(45)" fill="none" stroke="red" />
	</Center>

	<Center props={$sacralProps} gates={sacralGates}>
		<path d={roundedSquare($sacralProps.size)} fill="none" stroke="red" />
	</Center>

	<Center props={$rootProps} gates={rootGates}>
		<path d={roundedSquare($rootProps.size)} fill="none" stroke="red" />
	</Center>

	<Center props={$willProps} gates={willGates}>
		<use href="#triangle" transform="scale(0.85,0.85) rotate(15)" fill="none" stroke="red" />
	</Center>

	<Center props={$spleenProps} gates={spleenGates}>
		<path d={roundedTriangle($spleenProps.size)} transform="rotate(90)" fill="none" stroke="red" />
	</Center>

	<Center props={$espProps} gates={espGates}>
		<path d={roundedTriangle($espProps.size)} transform="rotate(270)" fill="none" stroke="red" />
	</Center>
</svg>
