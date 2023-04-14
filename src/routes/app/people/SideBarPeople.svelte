<script lang="ts">
	import type { ClientSidePerson } from '$lib/stores/people';
	import { page } from '$app/stores';
	export let userPeople: Record<string, ClientSidePerson>;

	$: peopleList = Object.values(userPeople);
  export let query: string;

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

<ul>
	{#each people as person (person.slug)}
		<li class="list-nav">
			<div class="flex w-full">
				<a class="list-nav" href="/app/people/{person.slug}">
					{person.firstName}
					{person.lastName}
				</a>
				<a class="list-nav" href="/app/people/{person.slug}/edit">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M2 16a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10zm2 0V6h10v10H4zm4-8a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
			</div>
		</li>
	{/each}
</ul>

<style lang="postcss">
	a:visited {
		color: inherit;
	}

	a {
		text-decoration: none;
		@apply text-current no-underline cursor-default transition-all duration-200;
	}

	a:hover {
		@apply underline cursor-pointer;
	}
</style>
