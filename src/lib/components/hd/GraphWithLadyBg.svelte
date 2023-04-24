<script lang="ts">
	import { onMount } from 'svelte';
	import graphBg from '$lib/images/silhouette_seated.svg';
	import LotusPath from './LotusPath.svelte';
	import SahasraraMandala from '$lib/images/Sahasrara_Mandala.svelte';

	let bgPath = '';
	let svgCont: SVGGElement;
	onMount(async () => {
		svgCont.innerHTML = await fetch(graphBg).then((t) => t.text());
		bgPath = (svgCont.querySelector('path') as SVGPathElement)?.getAttribute('d') || '';
	});
</script>

<g style:display="none" bind:this={svgCont} />

<g class="graph-bg">
	<SahasraraMandala />
	<LotusPath />
	<path d={bgPath} class="body" />
</g>


<style lang="postcss">
	.graph-bg path.body {
		fill: none;
		/* apply stroke-secondary-300 fill-secondary-100 dark:stroke-secondary-700 dark:fill-secondary-900; */
		transform: scale(1) scaleY(0.9) translateX(-450px) translateY(120px);
	}
</style>
