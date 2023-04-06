<script lang="ts">
	import { getContext } from "svelte";
  export let viewBox: string;
  export let sizeClass: string = "w-full h-full"

  export let strokeWidth: number = getContext("strokeWidth") || 1;

</script>

<svg
  {viewBox}
  class="stroke-black dark:stroke-white {sizeClass} fill-none"
  stroke-width={strokeWidth}
  xmlns="http://www.w3.org/2000/svg"
>
  <slot />
</svg>
