<script lang="ts">
	import type { ChannelConf, PipProps } from '$lib/theme';
	import type { CenterName, Chart } from '$lib/hd';
	import type { Point } from '$lib/svg';
	import { centers } from '$lib/hd/graph';

	import theme from '$lib/theme';
	import { pathFrom, SvgPath, toPoint, subtract, addPoint } from '$lib/svg';

	import Center from './Center.svelte';
	import Pip from './Pip.svelte';

	import DropShadow from '../svg/DropShadow.svelte';

	import { writable } from 'svelte/store';
	import { entries } from '../helper';
	const opts = [["inner", 0] as const, ["outer", 100] as const]

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

	export let charts: {chart: Chart, name: string, color: string, displayName: string, link?: string|(()=>void)}[];

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

	type MyChannelProps = [
		PipProps,
		PipProps,
		CenterName,
		CenterName,
		string,
		string,
		number,
		ChannelConf['7'] | null,
		string
	];

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

		return [
			g1,
			g2,
			center1,
			center2,
			path1,
			path2,
			d,
			_shapes,
			`hd-ch-${gate1}-${gate2}`
		] as MyChannelProps;
	});

</script>

<svg style:display="none" />
<svg
	width="800"
	height="1200"
	class="dark:fill-slate-100"
	viewBox="-400 0 800 1200"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<radialGradient id="RadialGradient1" fx="0%" fy="0%" r="40%" cx="0" cy="0">
			<stop offset="0%" stop-color="red" />
			<stop offset="100%" stop-color="red" stop-opacity="0" />
		</radialGradient>
		<DropShadow id="dropShadow" />

	</defs>

	{#each channels as [gate1, gate2, center1, center2, p1, p2, dash, shapes, klass], idx (`${gate1.gate}-${gate2.gate}`)}
		<g>
		<path class="backing" d={p1} />
		<path class="backing mask" d={p1} />
		{#each opts as [name, offset]}
			<clipPath id="{klass}{name}">
				{#if shapes}
					<path d={shapes.inner} />
				{:else}
					<rect
						x={gate1.x - offset}
						y={Math.min(gate1.y, gate2.y) - 30}
						width="100"
						height={100 + Math.round(Math.abs(gate1.y - gate2.y))}
					/>
				{/if}
			</clipPath>

		{/each}
			
		<path
			d={p1}
			stroke-width={gate1.radius * 1.4}
			stroke-dasharray="{dash} 100000"
			stroke-linecap="butt"
			class="stroke-primary-500"
			opacity="0.85"
			fill="none"
		/>
		<path
		  d={p1}
			stroke-width={gate1.radius * 1.4}
			stroke-dasharray="{dash} 100000"
			stroke-linecap="butt"
			class="stroke-tertiary-700"
			clip-path="url(#{klass}inner)"
			fill="none"
		/>

		</g>
	{/each}

	{#each entries(theme.centers) as [name, { x, y, size, shape, rotation }]}
		<Center {name} {x} {y} {size} {shape} {rotation}>
			{#each centers[name].gates as gate}
				<Pip {...theme.gates[gate]} />
			{/each}
		</Center>
	{/each}

</svg>

<style lang="postcss">
	svg {
		border: 1px solid;
		@apply border-slate-700;
	}
	.backing {
		stroke-linecap: butt;
		fill: none;
		stroke-width: 24px;
		opacity: 0.7;
		@apply stroke-blue-900;
	}
	.backing.mask {
		stroke-width: 22px;
		@apply dark:stroke-black stroke-white;

	}
</style>
