<script lang="ts">
  export let shape: (size: number) => string;
  export let x: number;
  export let y: number;
  export let size: number;
  export let rotate = 0

</script>

<g>
  <slot />
</g>