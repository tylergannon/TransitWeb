<script lang="ts">
	import type { GateNumber } from '$lib/hd';
	import { hexagram } from '$lib/svg/hexagram';

	export let gateNumber: GateNumber;
	export let cX: number = 0;
	export let cY: number = 0;
	export let width: number = 50;

	const strokeRatio: number = 0.12;

  $: path = hexagram(gateNumber, width, cX, cY)

</script>

<path d="{path}" stroke-width="{width * strokeRatio}" />

<style lang="postcss">
	path {
		@apply dark:stroke-white stroke-black;
		stroke-linecap: round;
		fill: none;
	}
</style>