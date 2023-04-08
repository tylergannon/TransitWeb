<script lang="ts">
	import type { CenterName } from '$lib/hd';
	import { SvgPath } from '$lib/svg/path';

	export let name: CenterName;
	export let x: number;
	export let y: number;
	export let shapeSize: number;

	export let scale: number | undefined = undefined;
	export let shape: 'triangle' | 'square' | undefined = undefined;
	export let rotation: number | undefined = undefined;

	$: path = new SvgPath()
		.move([x, y], 'M')
		.rotate(rotation || 0)
		[shape === 'square' ? 'roundedSquare' : 'roundedTriangle'](shapeSize * (scale || 1))
		.toString();
</script>

<g class="center-group center-{name}">
	<path d={path} />
	<g>
		<slot />
	</g>
</g>
