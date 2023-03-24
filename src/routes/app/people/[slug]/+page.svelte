<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getContext } from 'svelte';
	import { derived, type Unsubscriber } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { utcToZonedTime, formatInTimeZone } from 'date-fns-tz';
	import type { PageData } from './$types';
	import type { PeopleStore } from '$lib/stores/people';
	import { chartRequest, type HdChartJson } from '$lib/hd/chart';
	import Designer from '$lib/components/Designer.svelte';

	const userPeople = getContext('userPeople') as Writable<PeopleStore>;
	export let data: PageData;
	if (!Object.prototype.hasOwnProperty.call($userPeople, data.person.slug)) {
		userPeople.update((people) => {
			people[data.person.slug] = data.person;
			return people;
		});
	}
	let chart: HdChartJson | undefined = undefined;

	const person = derived(userPeople, ($userPeople) => $userPeople[data.person.slug]);
	let unsubscribe: Unsubscriber | undefined = undefined;

	onMount(async () => {
		unsubscribe = person.subscribe(async (person) => {
			try {
				chart = await chartRequest(
					formatInTimeZone(person.dobUtc, person.tz, 'yyyy-MM-dd'),
					formatInTimeZone(person.dobUtc, person.tz, 'HH:mm:ss'),
					person.tz
				);
			} catch (e) {
				console.error('Had an issue with the chart request.', e);
			}
		});
	});
	onDestroy(()=> unsubscribe && unsubscribe());
</script>

<Designer />
