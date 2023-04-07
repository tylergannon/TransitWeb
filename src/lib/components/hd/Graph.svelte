<script lang="ts">
	import type { GateArgs, GatesRecord as CenterGates } from '$lib/theme/gates';
	import type { CenterDisplayProps, CenterName, PipProps } from '$lib/hd/graph';

	import Center from './Center.svelte';
	import Pip from './Pip.svelte';
	import { pathFrom, SvgPath, toPoint } from '$lib/svg/path';
	import { subtract, add as addPoint } from '$lib/svg/calc';
	import type { Point } from '$lib/svg/types';

	import DropShadow from '../svg/DropShadow.svelte';

	import theme, { type CenterProps } from '$lib/theme';
	import type { GateNumber } from '$lib/hd/gateNumber';

	export let {
		aspectRatio,
		pipRadius,
		channelSpace,
		distFromEdge,
		scale,
		squareSize,
		triangleSize,
		width
	} = theme.props;

	export let {
		head,
		ajna,
		throat,
		g,
		sacral,
		root,
		will,
		esp,
		spleen
	} = theme.centers;

	const roundedTriangleHeight = (size: number, r = 0.6) => size * (1 - 0.134 / (1 + 2 * r));

	const _props = ({ x, y, scale, shapeSize, shape }: CenterProps) =>
		({
			x,
			y,
			scale: scale || 1,
			pipRadius: pipRadius * (scale || 1),
			channelSpace: channelSpace * (scale || 1),
			distFromEdge: distFromEdge * (scale || 1),
			size: shapeSize * (scale || 1),
			height: (shape === 'square' ? shapeSize : roundedTriangleHeight(shapeSize)) * (scale || 1),
			centerDx: (scale || 1) * (2 * pipRadius + channelSpace)
		} as CenterDisplayProps);

	const entryForGate = (ctr: CenterProps, [gate, fns]: [string, GateArgs]): [GateNumber, PipProps] => {
		const p = _props(ctr);
		return [
			gate as GateNumber,
			{
				gate: gate as GateNumber,
				radius: p.pipRadius,
				x: p.x + fns[0](p),
				y: p.y + fns[1](p)
			}
		];
	};

	const centerGates = <T extends CenterName>(ctr: CenterProps) =>
		Object.fromEntries(
			Object.entries(theme.gates[ctr.name]).map((p) => entryForGate(ctr, p))
		) as CenterGates<T, PipProps>;

	$: data = {
		"head": {center: head, gates: centerGates<'head'>(head)},
		"ajna": {center: ajna, gates: centerGates<'ajna'>(ajna)},
		"throat": {center: throat, gates: centerGates<'throat'>(throat)},
		"g": {center: g, gates: centerGates<'g'>(g)},
		"sacral": {center: sacral, gates: centerGates<'sacral'>(sacral)},
		"root": {center: root, gates: centerGates<'root'>(root)},
		"will": {center: will, gates: centerGates<'will'>(will)},
		"esp": {center: esp, gates: centerGates<'esp'>(esp)},
		"spleen": {center: spleen, gates: centerGates<'spleen'>(spleen)}
	}
	
	const channelOutline = (gate1: PipProps, gate2: PipProps, path: string, offset: number) => {
		return new SvgPath(path).line([0, -1])
	}

	const channelPath = (gate1: PipProps, p1: Point|null, p2: Point|null, gate2: PipProps): string => {
		console.log("channelPath", gate1, p1, p2, gate2)
		if (p1 === null || p2 === null)
			return pathFrom(toPoint(gate1)).line(toPoint(gate2), "L").toString();
		const pos1 = toPoint(gate1);
		const pos2 = toPoint(gate2);
		const pos2rel = subtract(pos2, pos1);

		return pathFrom(pos1)
			.cubic(p1, addPoint(pos2rel, p2), pos2rel)
			.toString()
	}

	$: channels = theme.channels.map(([gate1, gate2, center1, center2, p1, p2]) => {
		console.log("channel", gate1, gate2, center1, center2, p1, p2)
		const g1 = (data[center1].gates as CenterGates<typeof center1, PipProps>)[gate1];
		const g2 = (data[center2].gates as CenterGates<typeof center2, PipProps>)[gate2];

		return [gate1, gate2, center1, center2, channelPath(g1, p1, p2, g2)];
	})

</script>

<svg
	width={width}
	height={width / aspectRatio}
	class="dark:fill-slate-100"
	viewBox="-500 0 1000 1200"
	xmlns="http://www.w3.org/2000/svg"
>
<defs>
	<radialGradient id="RadialGradient1" fx="0%" fy="0%" r="40%" cx="0" cy="0" >
		<stop offset="0%" stop-color="red" />
		<stop offset="100%" stop-color="red" stop-opacity="0" />
	</radialGradient>
	<DropShadow id="dropShadow" />
</defs>

	{#each channels as [gate1, gate2, center1, center2, path] (`${gate1}-${gate2}`)}
		<path
			id="ch{gate1}-{gate2}"
			d={path}
			filter="url(#dropShadow)"
			stroke-width={pipRadius * 1.4}
			stroke="green"
			stroke-linecap="round"
			fill="none"
			z="1"
			/>
	{/each}

	{#each Object.values(data) as {center, gates}}
		<Center {...center}>
			{#each Object.values(gates) as gate}
				<Pip {...gate} />
			{/each}
		</Center>
	{/each}
</svg>

<style lang="postcss">
	svg {
		border: 1px solid red;
	}
</style>