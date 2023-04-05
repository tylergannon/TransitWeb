<script lang="ts">
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import Person from './Person.svelte';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { AppShell, ListBox } from '@skeletonlabs/skeleton';
	import { deletePerson } from './[slug]/client';
	import SideBarPeople from './SideBarPeople.svelte';
	const userPeople = getContext('userPeople') as PeopleStore;
	let group = '';

	const remove = ({detail: slug}: CustomEvent<string>) => {
		deletePerson({slug}).then(() => {
			userPeople.remove(slug);
		});
	}
</script>

<AppShell class="min-h-screen bg-white dark:bg-black flex-col" slotPageContent="flex-grow" regionPage="min-h-fit">

	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div id="list" class="flex-grow min-h-full lg:w-72 p-4 mr-2 dark:bg-surface-900 border-solid border-slate-400">
			<div class="flex flex-col space-y-4">
				<input type="search" class="input" />
				<SideBarPeople userPeople={$userPeople} />
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />

	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter" />
	<svelte:fragment slot="footer">This is where my feet go.</svelte:fragment>

</AppShell>

<style>
	#list {
		border-right-width: 0.2px;
	}
</style>
