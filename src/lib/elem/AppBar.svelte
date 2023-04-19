<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import IncompleteCancel from 'carbon-icons-svelte/lib/IncompleteCancel.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';

	import UserMenu from '$lib/components/nav/UserMenu.svelte';
	import { Popup } from '$lib/components/presentation/popup';

	const popup = new Popup({
		placement: 'bottom',
		offset: { mainAxis: 4, crossAxis: -40 },
		dismiss: true,
	})

</script>

<AppBar spacing="space-y-2" padding="p-1">
	<div class="flex items-center space-x-4 divide-x lg:pl-8">
		<a href="/app/people">People</a>
		<a href="/app/people/new" class="pl-4">New Person</a>
	</div>

	<svelte:fragment slot="lead">
		<div class="flex items-center space-x-4">
			<a href="/app" class="lg:!ml-0 w-[32px] lg:w-auto overflow-hidden flex flex-row space-x-2">
				<span><IncompleteCancel size={32} /></span>
				<span class="lg:h-8 lg:pt-1">TransitHD</span>
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="headline">
	</svelte:fragment>
	<svelte:fragment slot="trail">
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
	</svelte:fragment>
</AppBar>

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