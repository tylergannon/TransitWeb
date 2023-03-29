<script lang="ts">
	import type { BodyGraphProps, CenterName } from '$lib/hd/graph';
	import type { CenterProps } from '$lib/hd/stores';
	import { DEFAULT_CENTER_ARGS, DEFAULT_GRAPH_PROPS } from '$lib/hd/stores';
	import Center from './NewCenter.svelte';

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
</script>

<svg width="{graphProps.width}" height="{graphProps.height}" viewBox="-500 0 1000 1200" xmlns="http://www.w3.org/2000/svg">
	{#each [head, ajna, throat, g, sacral, root, will, esp, spleen] as center (center.name)}
		<Center {...center} {pipRadius} {channelSpace} {distFromEdge} />
	{/each}
</svg>
