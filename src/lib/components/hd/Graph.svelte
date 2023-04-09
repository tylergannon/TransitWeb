<script lang="ts">
	import type { PipProps } from '$lib/theme';
	import type { CenterName } from '$lib/hd';
	import type { Point } from '$lib/svg';
	import { centers } from '$lib/hd/graph';

	import theme from '$lib/theme';
	import { pathFrom, SvgPath, toPoint, subtract, addPoint } from '$lib/svg';

	import Center from './Center.svelte';
	import Pip from './Pip.svelte';

	import DropShadow from '../svg/DropShadow.svelte';

	import { writable } from 'svelte/store';
	import { entries } from '../helper';


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

	let dragging: number | null = null;
	const onMouseUp = () => (dragging = null);
	let points = writable([
		[-259, 588],
		[-324, 710],
		[-90, 610],
		[-80, 649]
	] as [Point, Point, Point, Point]);
	const colors = ['red', 'green', 'blue', 'yellow'];

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

	$: channels = theme.channels.map(([gate1, gate2, center1, center2, dash, p1, p2, shapes]) => {
		const g1 = theme.gates[gate1];
		const g2 = theme.gates[gate2];
		const d = dash || Math.sqrt(Math.pow(g1.x - g2.x, 2) + Math.pow(g1.y - g2.y, 2)) / 1.915;
		const path1 = channelPath(g1, p1, p2, g2);
		const path2 = channelPath(g2, p2, p1, g1);
		const _shapes = !shapes
			? null
			: {
					inner: [path2, shapes.inner, 'Z'].join(' '),
					outer: [path2, shapes.outer, 'Z'].join(' ')
			  };

		return [g1, g2, center1, center2, path1, path2, d, _shapes, `hd-ch-${gate1}-${gate2}`] as [
			PipProps,
			PipProps,
			CenterName,
			CenterName,
			string,
			string,
			number,
			typeof _shapes,
			string,
		];
	});

	$: path2 = `M${$points[0][0]},${$points[0][1]} C${$points[1][0]},${$points[1][1]},${$points[2][0]},${$points[2][1]},${$points[3][0]},${$points[3][1]}`;
</script>

<svelte:window on:mouseup={onMouseUp} />
<h1>{path2}</h1>
<svg style:display="none">
</svg>
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
	
		{#each channels as [gate1, gate2, center1, center2, dash, p1, p2, shapes]}
			<clipPath id="hd-ch-{gate1.gate}-{gate2.gate}-inner">
				{#if shapes}
					<path d={shapes.inner} fill="white" />
				{:else}
					<rect
						x={gate1.x}
						y={Math.min(gate1.y, gate2.y) - 50}
						width="100"
						height={100 + Math.round(Math.abs(gate1.y - gate2.y))}
					/>
				{/if}
			</clipPath>
			<clipPath id="hd-ch-{gate1.gate}-{gate2.gate}-outer">
				{#if shapes}
					<path d={shapes.outer} />
				{:else}
					<rect
						x={gate1.x - 100}
						y={Math.min(gate1.y, gate2.y) - 50}
						width="100"
						height={100 + Math.round(Math.abs(gate1.y - gate2.y))}
					/>
				{/if}
			</clipPath>
			<path id="hd-ch-{gate1.gate}-{gate2.gate}" d={p1} />
			<g id="hd-grid">
				{#each Array.from({ length: 20 }) as _, idx (`${idx}`)}
					<line
						y1="0"
						x1={idx * 25}
						y2="1200"
						x2={idx * 25}
						stroke="white"
						stroke-width={idx % 10 === 0 ? 3 : idx % 5 === 0 ? 1 : 0.5}
					/>
					<line
						y1="0"
						x1={-idx * 25}
						y2="1200"
						x2={-idx * 25}
						stroke="white"
						stroke-width={idx % 10 === 0 ? 3 : idx % 5 === 0 ? 1 : 0.5}
					/>
				{/each}
				{#each Array.from({ length: 48 }) as _, idx (`${idx}`)}
					<line
						x1="-500"
						x2="500"
						y1={idx * 25}
						y2={idx * 25}
						stroke="white"
						stroke-width={idx % 10 === 0 ? 3 : idx % 5 === 0 ? 1 : 0.5}
					/>
				{/each}
			</g>
		{/each}
	</defs>
	<use href="#hd-grid" />
	{#each channels as [gate1, gate2, center1, center2, p1, p2, dash, shapes, klass], idx (`${gate1.gate}-${gate2.gate}`)}
		<use stroke-width="{gate1.radius * 1.4}" stroke="green" href="#{klass}" fill="none" />
		<use stroke-width="{gate1.radius * 1.4}" stroke="red" href="#{klass}" clip-path="url(#{klass}-inner)" fill="none" />
	{/each}

	{#each entries(theme.centers) as [name, { x, y, size, shape, rotation, ...p}]}
		<Center {name} {x} {y} {size} {shape} {rotation}>
			{#each centers[name].gates as gate}
				<Pip {...theme.gates[gate]} />
			{/each}
		</Center>
	{/each}

	<path
		id="ch10-34x"
		d={path2}
		stroke-width="22"
		stroke="white"
		stroke-linecap="round"
		stroke-dasharray="22500 1000000"
		fill="none"
	/>
	{#each $points as point, idx}
		<circle
			cx={point[0]}
			cy={point[1]}
			r="14"
			fill={colors[idx]}
			on:mousedown={() => {
				dragging = idx;
			}}
		/>
	{/each}
</svg>

<style lang="postcss">
	svg {
		border: 1px solid red;
	}
</style>
