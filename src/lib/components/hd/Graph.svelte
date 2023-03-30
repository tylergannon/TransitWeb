<script lang="ts">
  import type { GateArgs, GatesRecord } from  '$lib/hd/gatePos';
	import type { BodyGraphProps, CenterDisplayProps, PipProps } from '$lib/hd/graph';
	import type { CenterProps, GateNumber } from '$lib/hd/stores';

	import { gatesConfig } from '$lib/hd/gatePos';
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

	let foo = 1
	$: makeBar = () => foo
	$: bar = makeBar()

	$: pipRadius = graphProps.pipRadius;
	$: channelSpace = graphProps.channelSpace;
	$: distFromEdge = graphProps.distFromEdge;

	const roundedTriangleHeight = (size: number, r = 0.6) =>
		size * (1- (0.134)/(1 + 2 * r))

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

	const gates = (ctr: CenterProps, [gate, fns]: [string, GateArgs]): [GateNumber, PipProps] => {
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

	$: headGates = Object.fromEntries(
		Object.entries(gatesConfig.head).map((p) => gates(head, p))
	) as GatesRecord<'head', PipProps>;
</script>

<svg
	width={graphProps.width}
	height={graphProps.height}
	viewBox="-500 0 1000 1200"
	xmlns="http://www.w3.org/2000/svg"
>
	{#each [head, ajna, throat, g, sacral, root, will, esp, spleen] as center (center.name)}
		<Center {...center} {pipRadius} {channelSpace} {distFromEdge} />
	{/each}
</svg>
