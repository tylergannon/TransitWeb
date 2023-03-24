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
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	import IncompleteCancel from 'carbon-icons-svelte/lib/IncompleteCancel.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import Assembly from 'carbon-icons-svelte/lib/Assembly.svelte';

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';

	import UserMenu from '$lib/components/nav/UserMenu.svelte';
	import { goto } from '$app/navigation';
	import Designer from '$lib/components/Designer.svelte';

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'userMenu'
	};

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
				<a href="/app">
					<span><IncompleteCancel size={32} /></span>
				</a>
				<span>TransitHD</span>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<slot name="actions" />
				<a
					type="button"
					class="btn variant-filled rounded-md"
					href="/app/design"
				>
					<span><Assembly size={24} /></span>
					<span>Designer</span>
				</a>
				{#if $userProfile}
					<button type="button" class="btn hover:text-secondary-600" use:popup={popupSettings} id="userMenu">
						<span><UserAvatarFilledAlt size={24} /></span>
						<span>Me</span>
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
