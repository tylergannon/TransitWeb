<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import CloseOutline from "carbon-icons-svelte/lib/CloseOutline.svelte";

	import { popup, SlideToggle } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { GeoNamesCityType, PersonType } from '$lib/srv/model';
	import { zonedTimeToUtc } from 'date-fns-tz';
	import { getContext } from 'svelte';
	import type { PeopleStore } from '$lib/stores/people';
	import AppBar from '$lib/elem/AppBar.svelte';
	import { writable } from 'svelte/store';
	import derivedStore from '$lib/stores/asyncDerivedStore';
	import { citiesStore, postForm } from './helper';

	const people = getContext('userPeople') as PeopleStore;

	const dispatch = createEventDispatcher();

	let selectedCity: GeoNamesCityType | null = null;
	let currTime = '';
	let currDate = '';
	let firstName = '';
	let lastName = '';
	let dobUtc: Date | null = null;

	let cityQuery = writable('');
	const cities = citiesStore(cityQuery);
	let citiesList: HTMLElement;
	
	onMount(() => {
		citiesList.addEventListener('click', (e) => {
			if (e.target instanceof HTMLElement) {
				const city = e.target.closest('[data-idx]') as HTMLDivElement;
				if (city) {
					const idx = parseInt(city.dataset.idx!);
					selectedCity = $cities[idx];
					console.log(selectedCity);
					// cityQuery.set('');
				}
			} else {
				console.log(`${e.target} is not an HTMLElement}`);
			}
		});
	});

	$: {
		if (currTime && currDate && selectedCity) {
			dobUtc = zonedTimeToUtc(`${currDate} ${currTime}`, selectedCity.tz);
		}
	}

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
	}


	let cityPopupSettings: PopupSettings = {
		placement: 'bottom',
		target: 'cities-results',
		event: 'focus' as unknown as 'click'
	};

	let selectedIdx = -1;

	const navigateList = (
		e: KeyboardEvent & {
			currentTarget: EventTarget & Window;
		}
	) => {
    if ($cities.length == 0) return;
		if (e.key === 'ArrowDown') {
      if (selectedIdx === $cities.length-1) {
        selectedIdx = 0;
      } else {
        selectedIdx += 1
      }
		} else if (e.key === 'ArrowUp' && selectedIdx >= 0) {
      if (selectedIdx === 0) {
        selectedIdx = $cities.length - 1;
      } else {
        selectedIdx -= 1
      }
		} else if (e.key === 'Escape') {
			document.getElementById('city-input')?.blur();
		} else if (e.key === 'Enter') {
      if (selectedIdx >= 0) {
				selectedCity = $cities[selectedIdx];
      } else {
        e.preventDefault()
      }
		}
	};

</script>

<div class="card w-90 min-h-[320px] rounded-none" style:z-index="1000" data-popup="cities-results">
	<section bind:this={citiesList}>
		{#each $cities as city,id (city._id)}
			<div
				data-idx={id}
				class="flex flex-row items-center p-2 cursor-pointer hover:bg-gray-100"
				on:click={() => { selectedCity = city; }}
				on:keydown={() => { selectedCity = city; }}
			>
				<div class="flex flex-col">
					<span class="text-lg font-semibold">{city.name}</span>
					<span class="text-sm text-gray-500"><em>{city.place[0]}</em>, {city.place.slice(2)}</span>
				</div>
			</div>
		{/each}
	</section>
</div>
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
							<span class="chip">
								<CloseOutline size={16} />
							</span>

						{:else}
						<span class="pl-4 prose">Where were they born?</span>
						{/if}
						<input
							use:popup={cityPopupSettings}
							class="input"
							disabled={selectedCity ? true : false}
							bind:value={$cityQuery}
							type="search"
							placeholder="Start typing a city name..."
						/>

					</label>
					<div class="flex flex-row">
						<label class="label mt-1.5">
							<span class="pl-4 prose">Date and time of birth.</span>
							<input bind:value={currTime} type="datetime-local" class="input" />
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
