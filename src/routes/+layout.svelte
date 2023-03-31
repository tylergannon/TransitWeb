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
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';


	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';
	import AppBar from './AppBar.svelte';


	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	handleSession(page);

	export let data: LayoutData;

	const userProfile = writable<Partial<UserType | null>>(data.user);
	console.log('userProfile', $userProfile);
	setContext('userProfile', userProfile);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar userProfile={$userProfile} />
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
