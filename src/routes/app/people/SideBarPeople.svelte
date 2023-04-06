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
