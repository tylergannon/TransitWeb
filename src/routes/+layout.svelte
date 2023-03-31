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

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';

	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';

	export let data: LayoutData;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	handleSession(page);
	setContext('userProfile', writable<Partial<UserType | null>>(data.user));

</script>

<slot />