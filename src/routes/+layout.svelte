<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { handleSession } from '@lucia-auth/sveltekit/client';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	import IncompleteCancel from 'carbon-icons-svelte/lib/IncompleteCancel.svelte';
	import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte"

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';
	
	import UserMenu from '$lib/components/nav/UserMenu.svelte';
	
	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'userMenu'
	}

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	handleSession(page);

	export let data: LayoutData;

	const userProfile = writable<Partial<UserType | null>>(data.user);
	console.log('userProfile', $userProfile);
	setContext('userProfile', userProfile);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<IncompleteCancel size={32} />
				TransitHD
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<slot name="actions" />
				{#if $userProfile}
					<button use:popup={popupSettings} id="userMenu">
						<UserAvatarFilledAlt size={24} />
					</button>
					<UserMenu />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<slot name="sidebarLeft" />
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<slot name="pageHeader" />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<slot name="pageFooter" />
	</svelte:fragment>
	<svelte:fragment slot="footer">This is where my feet go.</svelte:fragment>
</AppShell>
