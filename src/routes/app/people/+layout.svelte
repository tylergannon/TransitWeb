<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { deletePerson } from './[slug]/client';
	import SideBarPeople from './SideBarPeople.svelte';

	import SidePanelCloseFilled from 'carbon-icons-svelte/lib/SidePanelCloseFilled.svelte';
	import SidePanelOpenFilled from 'carbon-icons-svelte/lib/SidePanelOpenFilled.svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import Resizable from '$lib/components/presentation/Resizable.svelte';

	const userPeople = getContext('userPeople') as PeopleStore;

	let showSidebar = writable(true);
	setContext('showSidebar', showSidebar);

	let query = $page.url.searchParams.get('q') || '';

	const remove = ({ detail: slug }: CustomEvent<string>) => {
		deletePerson({ slug }).then(() => {
			userPeople.remove(slug);
		});
	};

	const toggleSidebar = () => {
		$showSidebar = !$showSidebar;
	};
</script>

<header>
  <AppBar />
</header>

<AppShell
	slotSidebarLeft="overflow-x-visible overflow-y-visible flex flex-row"
	class="min-h-screen bg-white dark:bg-black"
	slotPageContent="flex-grow"
	regionPage="min-h-fit"
>
	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Resizable allow={['right']} autoHide={true} minWidth={15} >
			<div class="sidebarLeft" class:showSidebar={$showSidebar}>
				<button
					on:click={toggleSidebar}
					title="{$showSidebar ? 'Hide' : 'Show'} Sidebar"
					type="button"
				>
					<svelte:component
						this={$showSidebar ? SidePanelCloseFilled : SidePanelOpenFilled}
						size={16}
					/>
				</button>
				<div class="space-y-4">
					<input placeholder="Search for a person" type="search" bind:value={query} class="input h-8 rounded-sm bg-transparent" />
					<SideBarPeople on:remove={remove} userPeople={$userPeople} bind:query />
				</div>
			</div>
		</Resizable>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader" />
	<!-- Router Slot -->
	<slot />

	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter" />
	<svelte:fragment slot="footer">This is where my feet go.</svelte:fragment>
</AppShell>

<style lang="postcss">
	input[type='search'] {
		&:hover {
			/** It should have a small drop shadow.*/
			box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
			border-width: 1.5px;
		}
	}
	.sidebarLeft {
		/* apply transition-[width]; */
		border-right-width: 0;
		overflow: hidden;

		&.showSidebar > button {
			left: 17rem;
			top: 3rem;
		}

		& > button {
			position: absolute;
		}

		&.showSidebar {
			/* apply min-h-full p-4 dark:bg-surface-900 border-solid border-slate-400; */
			border-right-width: 0.2px;
			overflow: visible;
		}
	}
</style>
