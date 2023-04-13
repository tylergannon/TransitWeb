<script lang="ts">
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	import { SlideToggle } from '@skeletonlabs/skeleton';

	import type { GeoNamesCityType } from '$lib/srv/model';
	import { zonedTimeToUtc } from 'date-fns-tz';
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';

	import { writable } from 'svelte/store';
	import { citiesStore } from './helper';

	import AutoCompleteItem from '$lib/components/complete/AutoCompleteItem.svelte';
	import PersonTags from './PersonTags.svelte';
	import type { ActionData, SubmitFunction } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const people = getContext('userPeople') as PeopleStore;

	const formResponse = (() => async ({ result }) => {
		await applyAction(result);
		if (result.type === "success") {
			people.add({
				...(form as NonNullable<ActionData>),
				dobUtc: dobUtc as Date,
				tags,
				firstName,
				lastName,
				placeId: (selectedCity as GeoNamesCityType)._id,
				tz: (selectedCity as GeoNamesCityType).tz,
			})
		}
		clearForm();
		goto("/app/people/" + (form as NonNullable<ActionData>).slug);
	}) satisfies SubmitFunction;

	export let form: ActionData

	let selectedCity: GeoNamesCityType | null = null;
	let currTime = '';
	let firstName = '';
	let lastName = '';
	let dobUtc: Date | null = null;

	$: invalidYear = dobUtc && (dobUtc.getFullYear() < 1550 || dobUtc.getFullYear() > 2649);

	let cityQuery = writable('');
	const cities = citiesStore(cityQuery);
	let dobInput: HTMLInputElement;
	let tagsInput = '';
	let tags: string[] = [];

	const selectCity = (city: GeoNamesCityType) => {
		selectedCity = city;
		cityQuery.set('');
		dobInput.focus();
	};

	$: {
		if (currTime && selectedCity) {
			dobUtc = zonedTimeToUtc(currTime, selectedCity.tz);
		}
	}

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

<form method="POST" action="/app/people/new" use:enhance={formResponse}>
	<div class="grid grid-cols-1">
		<label class="label">
			<span class="pl-4 prose">First, give them a name.</span>
			<input name="firstName" bind:value={firstName} required class="input" type="text" placeholder="First Name" />
		</label>
		<label class="label mt-1.5">
			<input name="lastName" bind:value={lastName} class="input" type="text" placeholder="Last Name (optional)" />
		</label>
		<input name="placeId" required value="{selectedCity?._id}" type="hidden" />
		<input name="dobUtc" required value="{dobUtc?.valueOf()}" type="hidden" />
		<input name="tz" required value="{selectedCity?.tz}" type="hidden" />

		{#each tags as tag}
			<input name="tags" value="{tag}" type="hidden" />
		{/each}

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
				form=""
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
					name="dob"
					required
					class:border-error-700={invalidYear}
					type="datetime-local"
					class="input"
					form=""
				/>
				<label class:block={invalidYear} for="dob">Year must be between 1550 and 2649.</label>
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

<style lang="postcss">
	label[for='dob'] {
		@apply text-xs text-error-700-200-token;
		display: none;
	}
</style>