<script lang="ts">
	import type { Chart, GateNumber } from '$lib/hd';
	import { chartLinkage } from '$lib/hd/graph';
	import * as graph from '$lib/hd/graph';

	import graphBg from '$lib/images/silhouette_seated.svg';

	import theme from '$lib/theme';

	import DropShadow from '../svg/DropShadow.svelte';

	import { entries, keys } from '../helper';
	import { onMount } from 'svelte';
	import LotusPath from './LotusPath.svelte';
	import SahasraraMandala from '$lib/images/Sahasrara_Mandala.svelte';
	import Channel from './Channel.svelte';
	import Pip from './Pip.svelte';

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

	export let charts: {
		chart: Chart;
		name: string;
		color: string;
		displayName: string;
		link?: string | (() => void);
	}[];

	$: linkage = chartLinkage(charts);

	$: channelData = keys(theme.channelForGate).map((g) => [
		g,
		linkage.gates[g] || [[], [], []],
		theme.channelForGate[g]
	]) as [GateNumber, graph._GateConf, graph.ChannelName][];

	let bgPath = '';
	let svgCont: HTMLDivElement;
	onMount(async () => {
		svgCont.innerHTML = await fetch(graphBg).then((t) => t.text());
		bgPath = (svgCont.querySelector('path') as SVGPathElement)?.getAttribute('d') || '';
	});
</script>

<div class="hidden" bind:this={svgCont} />
<svg
	{width}
	height={width * aspectRatio}
	class="dark:fill-slate-100"
	viewBox="-400 0 800 1200"
	xmlns="http://www.w3.org/2000/svg"
>
	<!--
	<g class="graph-bg">
		<SahasraraMandala />
		<LotusPath />
		<path d={bgPath} class="body" />
	</g>
	 -->

	<g class="channels">
		{#each channelData as [gate, link, channel]}
			<Channel
				{gate}
				sources={link[0]}
				channels={link[1]}
				colors={link[2]}
				dash={theme.channels[channel].dash}
			/>
		{/each}
	</g>

	<!-- Draw Centers Shapes -->
	<g class="center-group">
		{#each keys(theme.centers) as name}
			<use href="#center-{name}" class:def={!!linkage.centers[name]} />
		{/each}
	</g>
	<g class="pips">
		{#each keys(theme.centers) as ctr}
			{#each graph.centers[ctr].gates as gate}
				<Pip
					{...theme.gates[gate]}
					ctrDefined={!!linkage.centers[ctr]}
					defined={!!linkage.gates[gate]?.[0]}
				/>
			{/each}
		{/each}
	</g>

	<defs>
		<radialGradient id="RadialGradient1" fx="0%" fy="0%" r="40%" cx="0" cy="0">
			<stop offset="0%" stop-color="red" />
			<stop offset="100%" stop-color="red" stop-opacity="0" />
		</radialGradient>
		<DropShadow id="dropShadow" />
		<g id="centers-defs">
			{#each entries(theme.centers) as [name, center] (name)}
				<path id="center-{name}" d={center.path} />
			{/each}
		</g>
		<g id="channels-defs">
			{#each entries(theme.channels) as [name, channel] (name)}
				<path id="path-{name}" d={channel.path} />
			{/each}
		</g>
		<g id="channel-clip-path-defs">
			{#each entries(theme.channels) as [name, channel] (name)}
				<clipPath id="inner-{name}">
					<path d={channel.inner} />
				</clipPath>
				<clipPath id="outer-{name}">
					<path d={channel.outer} />
				</clipPath>
			{/each}
		</g>
	</defs>
</svg>

<style lang="postcss">
	g.center-group > use {
		@apply fill-secondary-200 stroke-secondary-700 dark:stroke-secondary-300;
		stroke-width: 2px;
	}

	g.center-group > use.def {
		@apply fill-secondary-500;
	}
	.graph-bg path.body {
		fill: none;
		@apply stroke-secondary-300 fill-secondary-100 dark:stroke-secondary-700 dark:fill-secondary-900;
		transform: scale(1) scaleY(0.9) translateX(-450px) translateY(120px);
	}
</style>
