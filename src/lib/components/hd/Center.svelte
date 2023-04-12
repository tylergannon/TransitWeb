<script lang="ts">
	import type { CenterName } from '$lib/hd';
	import { centers, type Linkage } from '$lib/hd/graph';
	import { SvgPath } from '$lib/svg/path';
	import type { GraphTheme } from '$lib/theme';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import Pip from './Pip.svelte';

	const theme: Readable<GraphTheme> = getContext('theme');
	const linkage: Readable<Linkage> = getContext('linkage');

	let path: string = "";
	

	export let name: CenterName;

	$: props = $theme.centers[name]
	$: channels = $linkage.centers[name];
	$: myGates = $linkage.gates;

	$: path = new SvgPath()
		.move([props.x, props.y], 'M')
		.rotate(props.rotation || 0)
		[props.shape === 'square' ? 'roundedSquare' : 'roundedTriangle'](props.size)
		.toString();
	const thisCenterGates = centers[name].gates;

</script>
<g class="center-group center-{name}">
	<path d={path} class:def={!!channels} />
	<g class="bg-he">
		{#each thisCenterGates as gate}
			<g class="gate" class:def={!!myGates[gate]}>
				<Pip {gate} defined={!!channels} />
			</g>
		{/each}

	</g>
	<g>
		<slot />
	</g>
</g>

<style lang="postcss">
	g.center-group > path {
		@apply fill-transparent stroke-secondary-700 dark:stroke-secondary-300;
		stroke-width: 2px;
	}

	g.center-group > path.def {
		@apply fill-secondary-500;
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