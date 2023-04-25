<script lang="ts">
	import '../app.postcss';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { handleSession } from '@lucia-auth/sveltekit/client';

	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';

	export let data: LayoutData;

	handleSession(page);

	setContext('userProfile', writable<UserType|null>(data.user ? {
		...data.user,
		dobUtc: data.user.dobUtc ? new Date(parseInt(data.user.dobUtc)) : undefined,
		tags: data.user.tags || [],
	} : null));

</script>

<svelte:body />

<slot />
<aside role="alertdialog">
</aside>
