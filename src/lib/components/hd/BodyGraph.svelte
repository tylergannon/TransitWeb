<script lang="ts">
	import { bodyGraphProps, centerArgs, centersArgs } from '$lib/hd/stores';

	import Center from './Center.svelte';

	import * as pos from '$lib/hd/gatePos';
	import { roundedSquare, roundedTriangle } from './roundedPolygon';
	import Pip from './Pip.svelte';
	import { pipProps } from '$lib/hd/graph';
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
		squareSize: 162,
	});

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
</script>

<svg width="500" height="600" viewBox="-500 0 1000 1200" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<path id="triangle" d={roundedTriangle($scaledProps.triangleSize)} />
		<path id="square" d={roundedSquare($scaledProps.squareSize * 162 / 150, 0.7)} />
	</defs>
	<!--Head-->
	<Center props={centersProps.head} let:props>
		<use href="#triangle" fill="none" stroke="red" />
		<Pip gate="64" {...pipProps(props, pos.leftChannelX, pos.triangleBottomY)} />
		<Pip gate="61" {...pipProps(props, pos.middleChannelY, pos.triangleBottomY)} />
		<Pip gate="63" {...pipProps(props, pos.rightChannelX, pos.triangleBottomY)} />
	</Center>

	<Center props={centersProps.ajna} let:props>
		<use href="#triangle" transform="rotate(180)" fill="none" stroke="red" />
		<Pip gate="47" {...pipProps(props, pos.leftChannelX, pos.triangleTopY)} />
		<Pip gate="24" {...pipProps(props, pos.centerChannelX, pos.triangleTopY)} />
		<Pip gate="4" {...pipProps(props, pos.rightChannelX, pos.triangleTopY)} />
		<Pip gate="17" {...pipProps(props, pos.leftChannelX, ({ size }) => size * 0.1)} />
		<Pip gate="4" {...pipProps(props, pos.centerChannelX, pos.triangleBottomY)} />
		<Pip gate="11" {...pipProps(props, pos.rightChannelX, ({ size }) => size * 0.1)} />
	</Center>

	<Center props={centersProps.throat} let:props>
		<path d="{roundedSquare(props.size)}" fill="none" stroke="red" />
		<!-- <use href="#square" fill="none" stroke="red" /> -->
		<Pip gate="62" {...pipProps(props, pos.leftChannelX, pos.top)} />
		<Pip gate="23" {...pipProps(props, pos.centerChannelX, pos.top)} />
		<Pip gate="56" {...pipProps(props, pos.rightChannelX, pos.top)} />
		<Pip gate="16" {...pipProps(props, pos.left, pos.topChannelY)} />
		<Pip gate="20" {...pipProps(props, pos.left, pos.middleChannelY)} />
		<Pip gate="35" {...pipProps(props, pos.right, pos.topChannelY)} />
		<Pip gate="12" {...pipProps(props, pos.right, pos.middleChannelY)} />
		<Pip gate="45" {...pipProps(props, pos.right, pos.bottomChannelY)} />
		<Pip gate="31" {...pipProps(props, pos.leftChannelX, pos.bottom)} />
		<Pip gate="8" {...pipProps(props, pos.centerChannelX, pos.bottom)} />
		<Pip gate="33" {...pipProps(props, pos.rightChannelX, pos.bottom)} />
	</Center>

	<Center props={centersProps.g} let:props>
		<path d="{roundedSquare(props.size)}" transform="rotate(45)" fill="none" stroke="red" />
		<Pip gate="7" {...pipProps(props, pos.leftChannelX, ({size}) => -size * 0.3)} />
		<Pip gate="1" {...pipProps(props, pos.centerChannelX, ({size}) => -size * 0.45)} />
		<Pip gate="3" {...pipProps(props, pos.rightChannelX, ({size}) => -size * 0.3)} />
		<Pip gate="15" {...pipProps(props, pos.leftChannelX, ({size}) => size * 0.3)} />
		<Pip gate="2" {...pipProps(props, pos.centerChannelX, ({size}) => size * 0.45)} />
		<Pip gate="46" {...pipProps(props, pos.rightChannelX, ({size}) => size * 0.3)} />
		<Pip gate="10" {...pipProps(props, ({size}) => -size * 0.45, pos.middleChannelY)} />
		<Pip gate="25" {...pipProps(props, ({size}) => size * 0.45, pos.middleChannelY)} />
	</Center>

	<Center props={centersProps.sacral} let:props>
		<path d="{roundedSquare(props.size)}" fill="none" stroke="red" />
		<Pip gate="5" {...pipProps(props, pos.leftChannelX, pos.top)} />
		<Pip gate="14" {...pipProps(props, pos.centerChannelX, pos.top)} />
		<Pip gate="29" {...pipProps(props, pos.rightChannelX, pos.top)} />
		<Pip gate="34" {...pipProps(props, pos.left, pos.topChannelY)} />
		<Pip gate="27" {...pipProps(props, pos.left, pos.bottomChannelY)} />
		<Pip gate="59" {...pipProps(props, pos.right, pos.bottomChannelY)} />
		<Pip gate="42" {...pipProps(props, pos.leftChannelX, pos.bottom)} />
		<Pip gate="3" {...pipProps(props, pos.centerChannelX, pos.bottom)} />
		<Pip gate="9" {...pipProps(props, pos.rightChannelX, pos.bottom)} />
	</Center>

	<Center props={centersProps.root} let:props>
		<path d="{roundedSquare(props.size)}" fill="none" stroke="red" />
		<Pip gate="53" {...pipProps(props, pos.leftChannelX, pos.top)} />
		<Pip gate="60" {...pipProps(props, pos.centerChannelX, pos.top)} />
		<Pip gate="52" {...pipProps(props, pos.rightChannelX, pos.top)} />
		<Pip gate="54" {...pipProps(props, pos.left, pos.topChannelY)} />
		<Pip gate="38" {...pipProps(props, pos.left, pos.middleChannelY)} />
		<Pip gate="58" {...pipProps(props, pos.left, pos.bottomChannelY)} />
		<Pip gate="19" {...pipProps(props, pos.right, pos.topChannelY)} />
		<Pip gate="39" {...pipProps(props, pos.right, pos.middleChannelY)} />
		<Pip gate="41" {...pipProps(props, pos.right, pos.bottomChannelY)} />
	</Center>

	<Center props={centersProps.will} let:props>
		<use href="#triangle" transform="scale(0.85,0.85) rotate(15)" fill="none" stroke="red" />
		<Pip gate="21" {...pipProps(props, ({size})=> size * 0.00, ({size})=>-size*0.24)} />
		<Pip gate="51" {...pipProps(props, ({size})=> -size * 0.15, ({size})=>-size*0.10)} />
		<Pip gate="26" {...pipProps(props, ({size})=> -size * 0.30, ({size})=>size*0.04)} />
		<Pip gate="40" {...pipProps(props, ({size})=> size * 0.20, ({size})=>size*0.26)} />

	</Center>

	<Center props={centersProps.spleen} let:props>
		<Pip gate="50" {...pipProps(props, pos.right, pos.middleChannelY)} />
		<Pip gate="48" {...pipProps(props, ({size})=> -size * 0.2, ({size})=>-size*0.36)} />
		<Pip gate="57" {...pipProps(props, ({size})=> size * 0.00, ({size})=>-size*0.27)} />
		<Pip gate="44" {...pipProps(props, ({size})=> size * 0.20, ({size})=>-size*0.17)} />
		<Pip gate="32" {...pipProps(props, ({size})=> size * 0.20, ({size})=>size*0.17)} />
		<Pip gate="28" {...pipProps(props, ({size})=> size * 0.00, ({size})=>size*0.27)} />
		<Pip gate="18" {...pipProps(props, ({size})=> -size * 0.2, ({size})=>size*0.36)} />
		<path d="{roundedTriangle(props.size)}" transform="rotate(90)" fill="none" stroke="red" />
	</Center>

	<Center props={centersProps.esp} let:props>
		<path d="{roundedTriangle(props.size)}" transform="rotate(270)" fill="none" stroke="red" />
		<Pip gate="6" {...pipProps(props, pos.left, pos.middleChannelY)} />
		<Pip gate="36" {...pipProps(props, ({size})=> size * 0.2, ({size})=>-size*0.36)} />
		<Pip gate="22" {...pipProps(props, ({size})=> size * 0.00, ({size})=>-size*0.27)} />
		<Pip gate="37" {...pipProps(props, ({size})=> -size * 0.20, ({size})=>-size*0.17)} />
		<Pip gate="49" {...pipProps(props, ({size})=> -size * 0.20, ({size})=>size*0.17)} />
		<Pip gate="55" {...pipProps(props, ({size})=> size * 0.00, ({size})=>size*0.27)} />
		<Pip gate="30" {...pipProps(props, ({size})=> size * 0.2, ({size})=>size*0.36)} />
	</Center>
</svg>
