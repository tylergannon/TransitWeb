<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import '$lib/theme/theme.postcss'

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { handleSession } from '@lucia-auth/sveltekit/client';

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';

	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';

	export let data: LayoutData;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	console.log("Is it heere??");
	handleSession(page);
	console.log("I wonder.");

	setContext('userProfile', writable<UserType|null>(data.user ? {
		...data.user,
		dobUtc: data.user.dobUtc ? new Date(parseInt(data.user.dobUtc)) : undefined,
		tags: data.user.tags || [],
	} : null));

</script>

<svelte:body data-theme="crimson" />

<slot />