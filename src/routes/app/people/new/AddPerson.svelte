<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	import { SlideToggle } from '@skeletonlabs/skeleton';

	import type { GeoNamesCityType } from '$lib/srv/model';
	import { zonedTimeToUtc } from 'date-fns-tz';
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';

	import { writable } from 'svelte/store';
	import { citiesStore, postForm } from './helper';
	import debounce from '$lib/components/helper';

	import AutoCompleteItem from '$lib/components/complete/AutoCompleteItem.svelte';
	import PersonTags from './PersonTags.svelte';

	const people = getContext('userPeople') as PeopleStore;

	const dispatch = createEventDispatcher();

	let selectedCity: GeoNamesCityType | null = null;
	let currTime = '';
	let firstName = '';
	let lastName = '';
	let dobUtc: Date | null = null;


	$: {
		console.log(`currTime: ${currTime}`);
	}

	let cityQuery = writable('');
	const cities = citiesStore(cityQuery);
	let dobInput: HTMLInputElement;
	let tagsInput = '';
	let tags: string[] = [];

	const selectCity = (city: GeoNamesCityType) => {
		selectedCity = city;
		cityQuery.set('');
		dobInput.focus();
		console.log(city);
	};

	$: {
		if (currTime && selectedCity) {
			dobUtc = zonedTimeToUtc(currTime, selectedCity.tz);
			console.log(`dobUtc: ${dobUtc}`);
		}
	}

	const handleSubmit = debounce(async (event: Event) => {
		console.log(`I am a handler!  Super snake viper!`);
		alert(JSON.stringify(event));
		event.preventDefault();
		if (!dobUtc || !firstName || !selectedCity) {
			console.log('missing data');
			return;
		}
		console.log({
			firstName,
			lastName,
			dobUtc,
			tz: selectedCity!.tz,
			placeId: selectedCity!._id,
			tags,
		});

		const newPerson = await postForm({
			firstName,
			lastName,
			dobUtc,
			tz: selectedCity!.tz,
			placeId: selectedCity!._id,
			tags,
		});

		people.add(newPerson);
		clearForm();
		dispatch('addPerson', newPerson);

		dispatch('close');
	});

	const clearForm = () => {
		firstName = '';
		lastName = '';
		currTime = '';
		dobUtc = null;
		selectedCity = null;
		tags = [];
		tagsInput = '';
		$cityQuery = '';
	};
</script>

<form on:submit={handleSubmit}>
	<div class="grid grid-cols-1">
		<label class="label">
			<span class="pl-4 prose">First, give them a name.</span>
			<input bind:value={firstName} required class="input" type="text" placeholder="First Name" />
		</label>
		<label class="label mt-1.5">
			<input bind:value={lastName} class="input" type="text" placeholder="Last Name (optional)" />
		</label>
		<label class="label mt-1.5">
			{#if selectedCity}
				<span class="pl-4 prose">Place of Birth</span>
			{:else}
				<span class="pl-4 prose">Where were they born?</span>
			{/if}
			{#if selectedCity}
				<div class="flex flex-row">
					<div
						class="hover:cursor-pointer chip variant-soft-secondary relative"
						on:click={() => (selectedCity = null)}
						on:keydown={() => (selectedCity = null)}
					>
						<div class="absolute top-2 right-2">
							<TrashCan />
						</div>
						<div class="flex flex-col items-start">
							<div class="text-lg">{selectedCity.name}</div>
							<span class="text-sm"
								>{selectedCity.place[0]}, {selectedCity.place[2]}, {selectedCity.place[3]}</span
							>
						</div>
					</div>
				</div>
			{/if}
			<input
				class="input"
				disabled={!!selectedCity}
				required={!selectedCity}
				style:display={selectedCity ? 'none' : 'block'}
				bind:value={$cityQuery}
				type="search"
				placeholder="Start typing a city name..."
			/>
		</label>
		<div class="autocomplete">
			<nav class="autocomplete-nav">
				<ul class="autocomplete-list list-nav">
					{#if !selectedCity}
						{#each $cities as city, i}
							<AutoCompleteItem
								classesItem="autocomplete-item"
								classesButton="autocomplete-button"
								on:click={() => selectCity(city)}
								on:keypress={() => selectCity(city)}
							>
								<div class="flex flex-col items-start">
									<span class="text-lg">{city.name}</span>
									<span class="text-sm">{city.place[0]}, {city.place[2]}, {city.place[3]}</span>
								</div>
							</AutoCompleteItem>
						{/each}
					{/if}
				</ul>
			</nav>
		</div>

		<div class="flex flex-row">
			<label class="label mt-1.5">
				<span class="pl-4 prose">Date and time of birth.</span>
				<input
					bind:value={currTime}
					bind:this={dobInput}
					required
					type="datetime-local"
					class="input"
				/>
			</label>
			<label class="label mt-1.5 ml-4" for="slider-label">
				<span class="pl-0 prose">Not sure?</span>
				<SlideToggle
					active="bg-secondary-500"
					tabindex="-1"
					name="slider-label"
					size="lg"
					checked={false}
				/>
			</label>
		</div>
		<PersonTags bind:selected={tags} bind:tagsInput />
	</div>
	<!-- <div class="form-control flex-row"> -->
	<!-- 	<AutoComplete bind:result={selectedCity} /> -->
	<!-- </div> -->
	<button type="submit" class="input btn variant-glass-secondary"> Create </button>
</form>
