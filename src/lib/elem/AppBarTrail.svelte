<script lang="ts">
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';

	import UserMenu from '$lib/components/nav/UserMenu.svelte';
	import { Popup } from '$lib/components/presentation/popup';

	const popup = new Popup({
		placement: 'bottom',
		offset: { mainAxis: 4, crossAxis: -40 },
		dismiss: true,
	})

</script>

<button
  type="button"
  class="btn hover:text-secondary-600"
  use:popup.target
  on:click={popup.toggle}
>
  <span><UserAvatarFilledAlt size={24} /></span>
  <span>Me</span>
</button>
<aside class="popup" use:popup.floating>
  <UserMenu />
</aside>

<style lang="postcss">
	.popup {
		position: absolute;
		visibility: hidden;
		opacity: 0;
		top: 0;
		left: 0;

		&:global(.show) {
			visibility: visible;
			opacity: 1;
		}
	}
</style>

