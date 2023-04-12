<script lang="ts">
	import type { Chart } from '$lib/hd';
	import { chartLinkage } from '$lib/hd/graph';

	import graphBg from '$lib/images/silhouette_seated.svg';

	import theme from '$lib/theme';

	import Center from './Center.svelte';

	import DropShadow from '../svg/DropShadow.svelte';

	import { writable, readable } from 'svelte/store';
	import { keys } from '../helper';
	import { onMount, setContext } from 'svelte';
	import LotusPath from './LotusPath.svelte';
	import SahasraraMandala from '$lib/images/Sahasrara_Mandala.svelte';
	
	const opts = [['inner', 0] as const, ['outer', 100] as const];

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

	const linkageStore = writable(linkage);
	$: $linkageStore = linkage;
	setContext('linkage', linkageStore);
	setContext('theme', readable(theme));
	
	let bgPath = '';
	let svgCont: HTMLDivElement;
	onMount(async () => {
		svgCont.innerHTML = await fetch(graphBg).then(t=>t.text());
		bgPath = (svgCont.querySelector('path') as SVGPathElement)?.getAttribute('d') || '';
	})
</script>
<div class="hidden" bind:this={svgCont}>

</div>
<svg
	{width}
	height={width * aspectRatio}
	class="dark:fill-slate-100"
	viewBox="-400 0 800 1200"
	xmlns="http://www.w3.org/2000/svg"
>
	<g class="graph-bg">
		<SahasraraMandala />
		<LotusPath />
		<path d="{bgPath}" class="body" />
	</g>

	{#each keys(theme.centers) as name}
		<Center {name} />
	{/each}

	<defs>
		<radialGradient id="RadialGradient1" fx="0%" fy="0%" r="40%" cx="0" cy="0">
			<stop offset="0%" stop-color="red" />
			<stop offset="100%" stop-color="red" stop-opacity="0" />
		</radialGradient>
		<DropShadow id="dropShadow" />
	</defs>
</svg>

<style lang="postcss">

	.graph-bg path.body {
		fill: none;
		@apply stroke-secondary-300 fill-secondary-100 dark:stroke-secondary-700 dark:fill-secondary-900;
		transform: scale(1.0) scaleY(0.9) translateX(-450px) translateY(120px);
	}
</style>
