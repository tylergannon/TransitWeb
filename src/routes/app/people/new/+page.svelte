<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import CaretRight from 'carbon-icons-svelte/lib/CaretRight.svelte';

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
	const userProfile = getContext('userProfile') as Writable<UserType & { tags: string[] }>;

	let selectedCity: GeoNamesCityType | null = null;
	let currTime = '';
	let firstName = '';
	let lastName = '';
	let dobUtc: Date | null = null;

	let tagsInput = '';
	// let tags: string[] = [];
	let showTagsControl = false;
	const toggleTagsCtrl = () => {
		showTagsControl = !showTagsControl;
	};

	const filterTags = (tags: string[], query: string) => {
		if (tags.length === 0) return [];
		const match = new RegExp('^' + tagsInput, 'i');
		return tags.filter((tag) => !!tag.match(match));
	};

	$: autoCompleteTags = filterTags($userProfile.tags, tagsInput);

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
		if (currTime && selectedCity) {
			dobUtc = zonedTimeToUtc(currTime, selectedCity.tz);
			console.log(`dobUtc: ${dobUtc}`);
		}
	}

	const addTag = (tag: string) => {
		tagObj = { ...tagObj, [tag]: true };
		tagsInput = '';
	};

	let tagObj: { [key: string]: boolean } = {};

	const clickTagHandler = (tag: string) => () => {
		tagObj = { ...tagObj, [tag]: !tagObj[tag] };
	};

	$: canCreateTag = (tagsInput.length > 2 && autoCompleteTags.length == 0);

	const createTag = async (tag: string) => {
		if (tag.length < 3) return;
		if ($userProfile.tags.includes(tag)) return addTag(tag);
		await updateProfile({ tags: [...$userProfile.tags, tag] }).then(() => {
			userProfile.update((value) => {
				return {
					...value,
					tags: [...value.tags, tag]
				};
			});
		});
		addTag(tag);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		if (!dobUtc || !firstName || !selectedCity) {
			console.log('missing data');
			return;
		};
		console.log({
			firstName,
			lastName,
			dobUtc,
			tz: selectedCity!.tz,
			placeId: selectedCity!._id,
			tags: Object.keys(tagObj).filter((tag) => tagObj[tag])
		})

		const newPerson = await postForm({
			firstName,
			lastName,
			dobUtc,
			tz: selectedCity!.tz,
			placeId: selectedCity!._id,
			tags: Object.keys(tagObj).filter((tag) => tagObj[tag])
		});

		people.add(newPerson);
		clearForm();

		dispatch('close');
	};
	const clearForm = () => {
		firstName = '';
		lastName = '';
		dobUtc = null;
		selectedCity = null;
		tagObj = {};
		tagsInput = '';
		$cityQuery = '';
	};


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
						<input bind:value={firstName} required class="input" type="text" placeholder="First Name" />
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
					<div class="card p-2 pt-0 mb-2" class:overflow-hidden={!showTagsControl}>
						<span class="card-header">
							<button
								id="toggleButton"
								class="toggle-button h-8 bg-transparent border-none focus:font-semibold focus:underline text-lg focus:outline-none"
								aria-controls="extraContent"
								aria-expanded="false"
								on:click={toggleTagsCtrl}
							>
								<span
									class="caret mr-2 p-1 py-0.5 h-4 w-4 inline-block transition-all duration-300 ease-in-out"
									style:transform={showTagsControl ? 'rotate(90deg)' : 'rotate(0deg)'}
								>
									<CaretRight />
								</span>
								<span class="py-1.5 mt-0.5 inline-block"
									>Tags{#if !showTagsControl && !tagObj} (Click to add){/if}</span
								>
							</button>
							<ul class="flex-nowrap inline-flex">
								{#each $userProfile.tags as sauce}
									{#if tagObj[sauce]}
										<li class="chip mx-1 mb-2 variant-soft-secondary">{sauce}</li>
									{/if}
								{/each}
							</ul>
						</span>
						<section>
							<div
								id="extraContent"
								aria-labelledby="toggleButton"
								class:max-h-0={!showTagsControl}
								class:max-h-96={showTagsControl}
								class:pb-2={showTagsControl}
								class:py-2={showTagsControl}
								class:px-2={true}
								style:overflow={showTagsControl ? 'visible' : 'hidden'}
								class="extra-content transition-all"
							>
								<input
									type="text"
									class="input mb-2"
									bind:value={tagsInput}
									on:keydown={(e)=>{if(e.key == 'Enter') {
										e.preventDefault();
										if (tagsInput.length > 2 && autoCompleteTags.length == 0) {
											createTag(tagsInput);
										}
									}}}
									placeholder="Click to add or type to filter..."
								/>
								<ul class="flex">
									<li class="transition-all {canCreateTag ? '' : 'max-h-0 max-w-0 opacity-0 hidden'}">
										<button
											on:click={ ()=> createTag(tagsInput) }
											class="chip variant-filled-primary mx-1 mb-2">Create "{tagsInput}"</button
										>
									</li>
									{#each autoCompleteTags as tag}
										<li>
											<button
												on:click={clickTagHandler(tag)}
												class:variant-soft-primary={!tagObj[tag]}
												class:variant-soft-secondary={!!tagObj[tag]}
												class="chip mx-1 mb-2">{tag}</button
											>
										</li>
									{/each}
								</ul>

								<!-- Extra content goes here -->
							</div>
						</section>
					</div>
				</div>
				<!-- <div class="form-control flex-row"> -->
				<!-- 	<AutoComplete bind:result={selectedCity} /> -->
				<!-- </div> -->
				<button
					type="submit"
					class="input btn variant-glass-secondary"
				>
					Create
				</button>
			</form>
		</section>
	</div>
	<div class="col-span-4" />
</div>
<div class="w-8/12 max-w-5xl" />
