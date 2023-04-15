<script lang="ts">
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

	import { computePosition } from '@floating-ui/dom';

	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import type { ClientSidePerson } from '$lib/stores/people';
	import Popup from '$lib/components/presentation/Popup.svelte';
	export let userPeople: Record<string, ClientSidePerson>;

	$: peopleList = Object.values(userPeople);
	export let query: string;

	const popupSettings: Omit<PopupSettings, 'target'> = {
		event: 'hover',
		middleware: {
			offset: {
				mainAxis: 0
			}
		},
		placement: 'top-end'
	};

	const peopleFilter = (q: string) => {
		const parts = q
			.split(' ')
			.filter((s) => !!s)
			.map((s) => new RegExp(`^${s}`, 'i'));
		if (!parts.length) return () => true;
		return (person: ClientSidePerson) =>
			person.firstName.match(parts[0]) && (parts.length === 1 || person.lastName?.match(parts[1]));
	};

	$: people = peopleList.filter(peopleFilter(query));
</script>

<nav class="list-nav">
	<ul>
		{#each people as { slug, firstName, lastName, ...rest } (rest._id)}
			<li aria-describedby="about-{slug}" use:popup={{ ...popupSettings, target: slug }}>
				<Popup>
					<a href="/app/people/{slug}" class="flex-1"> {firstName} {lastName} </a>
					<svelte:fragment slot="popup">
						<div id="about-{slug}" data-popup={slug} class="w-36 h-28">
							<a href="/app/people/{slug}" class="flex-1">
								<slot {slug} {firstName} {lastName} {rest}>
									{firstName}
									{lastName}
								</slot>
							</a>
						</div>
					</svelte:fragment>
				</Popup>
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
	[data-popup] {
		position: absolute;
	}
	[data-popup],
	[data-popup] > .arrow {
		@apply bg-surface-300-600-token;
		border: none;
		outline: none;
		z-index: 100;
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
