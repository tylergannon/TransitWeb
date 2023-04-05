<script lang="ts">
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { ClientSidePerson } from '$lib/stores/people';
	import { ListBoxItem } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	export let person: Writable<ClientSidePerson>;
	export let group: string;
	let deleteClicked = false;

	const dispatch = createEventDispatcher();
	let visible = true;
</script>

{#if visible}
	<div out:fade={{ duration: 500 }} class="overflow-clip">
		<ListBoxItem
			bind:group
			name="person"
			value={$person.slug}
			padding={visible ? 'px-4 py-2' : 'p-0'}
		>
			<div class="flex">
				<span>{$person.firstName}</span>
				<button class:hidden={deleteClicked} type="button" on:click={() => (deleteClicked = true)}>
					<TrashCan />
				</button>
				<button
					class:hidden={!deleteClicked}
					type="button"
					on:click={() => {
						dispatch('remove', $person.slug);
						visible = false;
					}}
					class="btn chip variant-filled-primary rounded-full hover:scale-105 transition-all duration-75 {visible
						? ''
						: 'border-1 border-slate-700'}">Remove {$person.firstName}?</button
				>
			</div>
		</ListBoxItem>
	</div>
{/if}
