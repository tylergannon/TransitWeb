<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import IncompleteCancel from 'carbon-icons-svelte/lib/IncompleteCancel.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import Assembly from 'carbon-icons-svelte/lib/Assembly.svelte';

	import type { UserType } from '$lib/srv/model';

	import UserMenu from '$lib/components/nav/UserMenu.svelte';

  export let userProfile: Partial<UserType>|null = null;

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'userMenu'
	};

</script>
<AppBar>
	<svelte:fragment slot="lead">
		<a href="/app">
			<span><IncompleteCancel size={32} /></span>
		</a>
		<span>TransitHD</span>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<slot name="actions" />
		<a type="button" class="btn variant-filled rounded-md" href="/app/design">
			<span><Assembly size={24} /></span>
			<span>Designer</span>
		</a>
		{#if userProfile}
			<button
				type="button"
				class="btn hover:text-secondary-600"
				use:popup={popupSettings}
				id="userMenu"
			>
				<span><UserAvatarFilledAlt size={24} /></span>
				<span>Me</span>
			</button>
			<UserMenu />
		{/if}
	</svelte:fragment>
</AppBar>
