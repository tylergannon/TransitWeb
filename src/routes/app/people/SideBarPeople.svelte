<script lang="ts">
	import { Popup } from '$lib/components/presentation/popup';
	import type { Click } from '$lib/components/types';
	import type { ClientSidePerson } from '$lib/stores/people';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { Edit, TrashCan } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	export let userPeople: Record<string, ClientSidePerson>;

	$: peopleList = Object.values(userPeople);
	export let query: string;

	const dispatch = createEventDispatcher<{'remove': string}>()

	const delPerson = (e: Click<HTMLButtonElement>) => {
		e.preventDefault();
		const slug = e.currentTarget.dataset.slug;
		modalStore.trigger({
			title: 'Delete Person',
			type: 'confirm',
			response(r: boolean) {
				if (r) dispatch('remove', slug);
			}
		})
	}

	const peopleFilter = (q: string) => {
		const parts = q
			.split(' ')
			.filter((s) => !!s)
			.map((s) => new RegExp(`^${s}`, 'i'));
		if (!parts.length) return () => true;
		return (person: ClientSidePerson) =>
			person.firstName.match(parts[0]) && (parts.length === 1 || person.lastName?.match(parts[1]));
	};
	let dark = false;

	$: people = peopleList.filter(peopleFilter(query));
</script>

<nav class="list-nav" class:dark>
	<ul>
		{#each people as { slug, firstName, lastName, ...rest } (rest._id)}
			{@const popup = new Popup({placement: "top-end", offset: {mainAxis: 0, crossAxis: 120}})}

			<li
				aria-describedby="about-{slug}"
				use:popup.target
				on:mouseover={popup.show}
				on:focus={popup.show}
				on:mouseleave={popup.hide}
				on:blur={popup.hide}
			>
				<a href="/app/people/{slug}" class="flex-1"> {firstName} {lastName} </a>
				<div id="about-{slug}" class="popup" use:popup.floating>
					<span class="flex-1 pl-1">{firstName} {lastName}</span>
					<div class="controls flex flex-row">
						<button type="button" on:click={delPerson} data-slug={slug}><TrashCan /></button>
						<a href="/app/people/{slug}/edit"><Edit /></a>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	a:visited {
		color: inherit;
	}
	a:focus {
		outline: none;
	}

	a {
		text-decoration: none;
		@apply text-current no-underline cursor-default transition-all duration-200;
	}

	a:hover {
		@apply underline cursor-pointer;
	}
	.popup {
		@apply flex-col w-44 h-16;
		@apply text-black dark:text-white bg-surface-50 dark:bg-surface-800 rounded-md border-surface-700-200-token;

		position: absolute;
		border: none;
		outline: none;
		z-index: 100;
		border: 0.01rem solid;

		visibility: hidden;
		opacity: 0;

		&:global(.show) {
			visibility: visible;
			opacity: 1;
		}
	}

	nav {
		li {
			position: relative;
			& > a {
				@apply flex w-full;
			}
		}
	}
</style>
