<script lang="ts">
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { deletePerson } from './[slug]/client';
	import SideBarPeople from './SideBarPeople.svelte';
	const userPeople = getContext('userPeople') as PeopleStore;
	let showSidebar = true;
	import SidePanelCloseFilled from "carbon-icons-svelte/lib/SidePanelCloseFilled.svelte";
	import SidePanelOpenFilled from "carbon-icons-svelte/lib/SidePanelOpenFilled.svelte";
	import { page } from '$app/stores';

	let query = $page.url.searchParams.get('q') || '';

	const remove = ({detail: slug}: CustomEvent<string>) => {
		deletePerson({slug}).then(() => {
			userPeople.remove(slug);
		});
	}
	
	const toggleSidebar = () => {
		showSidebar = !showSidebar;
	}
</script>

<AppShell class="min-h-screen bg-white dark:bg-black flex-col" slotPageContent="flex-grow" regionPage="min-h-fit">

	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class:showSidebar>
			<button
				on:click={()=>{showSidebar = !showSidebar;}}
				title="{showSidebar ? 'Hide' : 'Show'} Sidebar"
				type="button"
			>
				<svelte:component this={showSidebar ? SidePanelCloseFilled : SidePanelOpenFilled} />
			</button>
			<div class="flex flex-col space-y-4">
				<input type="search" bind:value={query} class="input" />
				<SideBarPeople userPeople={$userPeople} bind:query />
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

<style lang="postcss">
	#sidebar-left {
		@apply w-0 transition-[width];
		border-right-width: 0;

		&.showSidebar {
			@apply flex-grow min-h-full lg:w-72 p-4 mr-2 dark:bg-surface-900 border-solid border-slate-400;
			border-right-width: 0.2px;
		}
	}

</style>
