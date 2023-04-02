<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { GeoNamesCityType, UserType } from '$lib/srv/model';
	import { zonedTimeToUtc } from 'date-fns-tz';
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { citiesStore, postForm } from './helper';

	import AutoCompleteItem from '$lib/components/complete/AutoCompleteItem.svelte';
	import { updateProfile } from '../../settings/client';

	const people = getContext('userPeople') as PeopleStore;

	const dispatch = createEventDispatcher();
	const userProfile = getContext('userProfile') as Writable<UserType>;

	let selectedCity: GeoNamesCityType | null = null;
	let currTime = '';
	let currDate = '';
	let firstName = '';
	let lastName = '';
	let dobUtc: Date | null = null;

	$: {
		console.log(`currTime: ${currTime}`);
	}

	let cityQuery = writable('');
	const cities = citiesStore(cityQuery);
	let dobInput: HTMLInputElement;

	const selectCity = (city: GeoNamesCityType) => {
		selectedCity = city;
		cityQuery.set('');
		dobInput.focus();
		console.log(city);
	};

	$: {
		if (currTime && currDate && selectedCity) {
			dobUtc = zonedTimeToUtc(`${currDate} ${currTime}`, selectedCity.tz);
		}
	}

	const addTag = async (tag: string) => {
		if ($userProfile.tags.includes(tag)) return;
		await updateProfile({ tags: [...$userProfile.tags, tag] }).then(() => {
			userProfile.update((value) => {
				return {
					...value,
					tags: [...value.tags, tag]
				};
			});
		});
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		if (!dobUtc) return;

		const newPerson = await postForm({
			firstName,
			lastName,
			dobUtc,
			tz: selectedCity!.tz,
			placeId: selectedCity!._id,
			tags: []
		});

		people.add(newPerson);

		dispatch('close');
	};

	let cityPopupSettings: PopupSettings = {
		placement: 'bottom',
		target: 'cities-results',
		event: 'focus' as unknown as 'click'
	};

	let selectedIdx = -1;
</script>

<AppBar />
<div class="grid grid-cols-6">
	<div class="card col-span-2 col-start-2 card-hover p-4">
		<div class="card-header">
			<h3 class="mb-6 text-xl font-semibold">New Record</h3>
		</div>
		<section>
			<form on:submit={handleSubmit}>
				<div class="grid grid-cols-1">
					<label class="label">
						<span class="pl-4 prose">First, give them a name.</span>
						<input bind:value={firstName} class="input" type="text" placeholder="First Name" />
					</label>
					<label class="label mt-1.5">
						<input
							bind:value={lastName}
							class="input"
							type="text"
							placeholder="Last Name (optional)"
						/>
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
											>{selectedCity.place[0]}, {selectedCity.place[2]}, {selectedCity
												.place[3]}</span
										>
									</div>
								</div>
							</div>
						{/if}
						<input
							class="input"
							disabled={selectedCity ? true : false}
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
												<span class="text-sm"
													>{city.place[0]}, {city.place[2]}, {city.place[3]}</span
												>
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
								type="datetime-local"
								class="input"
							/>
						</label>
						<label class="label mt-1.5 ml-4" for="slider-label">
							<span class="pl-0 prose">Not sure?</span>
							<SlideToggle
								active="bg-secondary-500"
								name="slider-label"
								size="lg"
								checked={false}
							/>
						</label>
					</div>
					<label class="label mt-1 5">
						<span class="pl-4 prose">Tags (optional)</span>

						
					</label>
				</div>
				<!-- <div class="form-control flex-row"> -->
				<!-- 	<AutoComplete bind:result={selectedCity} /> -->
				<!-- </div> -->
				<button
					type="submit"
					class="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
				>
					Submit
				</button>
			</form>
		</section>
	</div>
	<div class="col-span-4" />
</div>
<div class="w-8/12 max-w-5xl" />
