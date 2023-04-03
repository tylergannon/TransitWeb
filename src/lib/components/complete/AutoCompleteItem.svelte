<script lang="ts">
	import { slide } from 'svelte/transition';

  export let classesItem = ""
  export let classesButton = "w-full"
  export let duration = 200
  export let label = ""
</script>


<li
	class="autocomplete-item {classesItem}"
	transition:slide|local={{ duration }}
>
	<button
		class="autocomplete-button {classesButton}"
		type="button"
		on:click
		on:keypress
	>
    <slot>
      {label}
    </slot>
	</button>
</li>
