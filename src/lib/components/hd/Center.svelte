<script lang="ts">
	import type { CenterDisplayProps } from "$lib/hd/graph";
	import type { Readable } from "svelte/store";

  export let props: Readable<CenterDisplayProps>;

</script>

<g transform="translate({$props.x},{$props.y}) scale({$props.scale},{$props.scale})">
  <slot props={$props} />
</g>
