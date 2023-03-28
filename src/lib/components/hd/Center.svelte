<script lang="ts">
	import type { CenterDisplayProps, CenterName, PipProps } from "$lib/hd/graph";
	import type { GateNumber } from "$lib/hd/stores";
	import type { Readable } from "svelte/store";
	import Pip from "./Pip.svelte";
  
  export let gates: Partial<Record<GateNumber, Readable<PipProps>>>
  export let props: CenterDisplayProps;

</script>

<g transform="translate({props.x},{props.y}) scale({props.scale},{props.scale})">
  <slot />
  {#each Object.entries(gates) as [gate, props]}
    <Pip {gate} {props} />
  {/each}
</g>
