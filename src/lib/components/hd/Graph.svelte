<script lang="ts">
	import type { GateArgs } from '$lib/theme';
	import type { CenterName, GatesRecord as CenterGates } from '$lib/hd';

	import Center from './Center.svelte';
	import Pip from './Pip.svelte';
	import { pathFrom, SvgPath, toPoint } from '$lib/svg/path';
	import { subtract, add as addPoint } from '$lib/svg/calc';
	import type { Point } from '$lib/svg/types';

	import DropShadow from '../svg/DropShadow.svelte';

	import theme, { type CenterDisplayProps, type CenterProps, type PipProps } from '$lib/theme';
	import type { GateNumber } from '$lib/hd';
	import { writable } from 'svelte/store';

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

	export let { head, ajna, throat, g, sacral, root, will, esp, spleen } = theme.centers;

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

	const entryForGate = (
		ctr: CenterProps,
		[gate, fns]: [string, GateArgs]
	): [GateNumber, PipProps] => {
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

	let dragging: number|null = null;
	const onMouseUp = () => dragging = null;
	let points = writable([
		[-259, 588],
		[-324, 710],
		[-90, 610],
		[-80, 649]
	] as [Point, Point, Point, Point])
	const colors = ["red", "green", "blue", "yellow"]


	const centerGates = <T extends CenterName>(ctr: CenterProps) =>
		Object.fromEntries(
			Object.entries(theme.gates[ctr.name]).map((p) => entryForGate(ctr, p))
		) as CenterGates<T, PipProps>;

	$: data = {
		head: { center: head, gates: centerGates<'head'>(head) },
		ajna: { center: ajna, gates: centerGates<'ajna'>(ajna) },
		throat: { center: throat, gates: centerGates<'throat'>(throat) },
		g: { center: g, gates: centerGates<'g'>(g) },
		sacral: { center: sacral, gates: centerGates<'sacral'>(sacral) },
		root: { center: root, gates: centerGates<'root'>(root) },
		will: { center: will, gates: centerGates<'will'>(will) },
		esp: { center: esp, gates: centerGates<'esp'>(esp) },
		spleen: { center: spleen, gates: centerGates<'spleen'>(spleen) }
	};

	const channelOutline = (gate1: PipProps, gate2: PipProps, path: string, offset: number) => {
		return new SvgPath(path).line([0, -1]);
	};

	const channelPath = (
		gate1: PipProps,
		p1: Point | null,
		p2: Point | null,
		gate2: PipProps
	): string => {
		if (p1 === null || p2 === null)
			return pathFrom(toPoint(gate1)).line(toPoint(gate2), 'L').toString();
		const pos1 = toPoint(gate1);
		const pos2 = toPoint(gate2);
		const pos2rel = subtract(pos2, pos1);

		return pathFrom(pos1).cubic(p1, addPoint(pos2rel, p2), pos2rel).toString();
	};

	$: channels = theme.channels.flatMap(([gate1, gate2, center1, center2, dash, p1, p2]) => {
		const g1 = (data[center1].gates as CenterGates<typeof center1, PipProps>)[gate1];
		const g2 = (data[center2].gates as CenterGates<typeof center2, PipProps>)[gate2];
		const d = dash || Math.sqrt(Math.pow(g1.x - g2.x, 2) + Math.pow(g1.y - g2.y, 2)) / 1.915;

		return [
			[gate1, gate2, center1, center2, channelPath(g1, p1, p2, g2), d],
			[gate2, gate1, center2, center1, channelPath(g2, p2, p1, g1), d]
		] as [GateNumber, GateNumber, CenterName, CenterName, string, number][];
	});
	const _gate = (g: GateNumber) => channels.find(([gate1]) => gate1 === g) as [GateNumber, GateNumber, CenterName, CenterName, string, number];
	$: gate20 = data['throat'].gates['20'];
	$: gate10 = data['g'].gates['10'];
	$: gate34 = data['sacral'].gates['34'];
	
	$: path2 = `M${$points[0][0]},${$points[0][1]} C${$points[1][0]},${$points[1][1]},${$points[2][0]},${$points[2][1]},${$points[3][0]},${$points[3][1]}`

</script>
<svelte:window on:mouseup={onMouseUp}  />
<h1>{path2}</h1>
<svg
	width="1000"
	height="1200"
	class="dark:fill-slate-100"
	viewBox="-500 0 1000 1200"
	xmlns="http://www.w3.org/2000/svg"
	on:mousemove={(e) => {
		if (dragging === null) return;
		$points[dragging] = [e.offsetX - 500, e.offsetY];
	}}
>
	<defs>
		<radialGradient id="RadialGradient1" fx="0%" fy="0%" r="40%" cx="0" cy="0">
			<stop offset="0%" stop-color="red" />
			<stop offset="100%" stop-color="red" stop-opacity="0" />
		</radialGradient>
		<DropShadow id="dropShadow" />
	</defs>

	{#each channels as [gate1, gate2, center1, center2, path, dash], idx (`${gate1}-${gate2}`)}
		<path
			id="ch{gate1}-{gate2}"
			d={path}
			stroke-width={pipRadius * 1.4}
			stroke={idx % 2 === 0 ? 'green' : 'brown'}
			stroke-linecap="round"
			stroke-dasharray="{dash} 1000000"
			fill="none"
		/>
	{/each}

	{#each Object.values(data) as { center, gates }}
		<Center {...center}>
			{#each Object.values(gates) as gate}
				<Pip {...gate} />
			{/each}
		</Center>
	{/each}

	<path
		id="ch10-34x"
		d="{path2}"
		stroke-width="22"
		stroke="white"
		stroke-linecap="round"
		stroke-dasharray="22500 1000000"
		fill="none"
	/>
	{#each $points as point, idx (`${idx}`)}
		<circle cx={point[0]} cy={point[1]} r="14" fill="{colors[idx]}" on:mousedown={()=>{dragging = idx;}} />
	{/each}
</svg>

<style lang="postcss">
	svg {
		border: 1px solid red;
	}
</style>
