<script lang="ts">
	import type { GateArgs, GatesRecord } from '$lib/hd/gatePos';
	import { CHANNELS, type BodyGraphProps, type CenterDisplayProps, type CenterName, type CenterRecord, type PipProps } from '$lib/hd/graph';
	import type { CenterProps, GateNumber } from '$lib/hd/stores';

	import { gatesConfig } from '$lib/hd/gatePos';
	import { DEFAULT_CENTER_ARGS, DEFAULT_GRAPH_PROPS } from '$lib/hd/stores';
	import Center from './NewCenter.svelte';
	import Pip from './Pip.svelte';
	import { pathFrom, SvgPath, toPoint } from '$lib/svg/path';
	import { subtract, add as addPoint } from '$lib/svg/calc';
	import type { Point } from '$lib/svg/types';

	// Be simple.  Take width & height, and print a nice graph.
	export let graphProps: BodyGraphProps = DEFAULT_GRAPH_PROPS;

	export let head: CenterProps = DEFAULT_CENTER_ARGS.head;
	export let ajna: CenterProps = DEFAULT_CENTER_ARGS.ajna;
	export let throat: CenterProps = DEFAULT_CENTER_ARGS.throat;
	export let g: CenterProps = DEFAULT_CENTER_ARGS.g;
	export let sacral: CenterProps = DEFAULT_CENTER_ARGS.sacral;
	export let root: CenterProps = DEFAULT_CENTER_ARGS.root;
	export let will: CenterProps = DEFAULT_CENTER_ARGS.will;
	export let esp: CenterProps = DEFAULT_CENTER_ARGS.esp;
	export let spleen: CenterProps = DEFAULT_CENTER_ARGS.spleen;

	$: pipRadius = graphProps.pipRadius;
	$: channelSpace = graphProps.channelSpace;
	$: distFromEdge = graphProps.distFromEdge;

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

	const buildGates = (ctr: CenterProps, [gate, fns]: [string, GateArgs]): [GateNumber, PipProps] => {
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

	const _gates = <T extends CenterName>(ctr: CenterProps) =>
		Object.fromEntries(
			Object.entries(gatesConfig[ctr.name]).map((p) => buildGates(ctr, p))
		) as GatesRecord<T, PipProps>;

	$: data = {
		"head": {center: head, gates: _gates<'head'>(head)},
		"ajna": {center: ajna, gates: _gates<'ajna'>(ajna)},
		"throat": {center: throat, gates: _gates<'throat'>(throat)},
		"g": {center: g, gates: _gates<'g'>(g)},
		"sacral": {center: sacral, gates: _gates<'sacral'>(sacral)},
		"root": {center: root, gates: _gates<'root'>(root)},
		"will": {center: will, gates: _gates<'will'>(will)},
		"esp": {center: esp, gates: _gates<'esp'>(esp)},
		"spleen": {center: spleen, gates: _gates<'spleen'>(spleen)}
	}

	const channelPath = (gate1: PipProps, p1: Point, p2: Point, gate2: PipProps): string => {
		console.log("channelPath", gate1, p1, p2, gate2)
		const pos1 = toPoint(gate1);
		const pos2 = toPoint(gate2);
		const pos2rel = subtract(pos2, pos1);
		return pathFrom(pos1)
			.cubic(p1, addPoint(pos2rel, p2), pos2rel)
			.toString()
	}

	$: channels = CHANNELS.map(([gate1, gate2, center1, center2, p1, p2]) => {
		console.log("channel", gate1, gate2, center1, center2, p1, p2)
		const g1 = (data[center1].gates as GatesRecord<typeof center1, PipProps>)[gate1];
		const g2 = (data[center2].gates as GatesRecord<typeof center2, PipProps>)[gate2];

		return [gate1, gate2, center1, center2, channelPath(g1, p1, p2, g2)];
	})


</script>

<svg
	width={graphProps.width}
	height={graphProps.height}
	viewBox="-500 0 1000 1200"
	xmlns="http://www.w3.org/2000/svg"
>
<defs>
	<radialGradient id="RadialGradient1" fx="0%" fy="0%" r="40%" cx="0" cy="0" >
		<stop offset="0%" stop-color="red" />
		<stop offset="100%" stop-color="red" stop-opacity="0" />
	</radialGradient>
	<defs>
    <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="0%" fy="0%">
      <stop offset="0%" style="stop-color:#ff0000;"/>
      <stop offset="100%" style="stop-color:#0000ff;"/>
    </radialGradient>
  </defs>
</defs>
	{#each channels as [gate1, gate2, center1, center2, path] (`${gate1}-${gate2}`)}
		<path
			id="ch{gate1}-{gate2}"
			d={path}
			stroke-width={pipRadius * 1.6}
			stroke="green"
			stroke-linecap="round"
			fill="none"
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
