<script lang="ts">
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	import { SlideToggle } from '@skeletonlabs/skeleton';

	import type { GeoNamesCityType } from '$lib/srv/model';
	import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

	import { derived, writable, type Writable } from 'svelte/store';
	import { citiesStore, formatDatetimeLocal } from './helper';

	import AutoCompleteItem from '$lib/components/complete/AutoCompleteItem.svelte';
	import PersonTags from './PersonTags.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ClientSidePerson } from '$lib/stores/people';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';

	type PersonFormEvents = {
		submit: Omit<ClientSidePerson, '_id' | 'slug'>;
	};

	const dispatch = createEventDispatcher<PersonFormEvents>();

	const submit = () => {
		dispatch('submit', {
			dobUtc: dobUtc as Date,
			tags,
			firstName,
			lastName,
			placeId: (selectedCity as GeoNamesCityType)._id,
			tz: (selectedCity as GeoNamesCityType).tz
		});
	};

	export let person: ClientSidePerson | null = null;
	export let selectedCity: GeoNamesCityType | null = null;
	export let action: string;
	export let method = 'POST';

	const response = (() => async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success') {
			submit();
		}
	}) satisfies SubmitFunction;

	const dobStore: Writable<Date> = writable(person?.dobUtc ?? new Date());

	$: console.log('person', person);

	$dobStore = person?.dobUtc ?? new Date();

	const dobStringStore = derived(dobStore, ($dobStore) => {
		return formatDatetimeLocal({
			dobUtc: $dobStore,
			tz: selectedCity?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone
		});
	});

	let firstName = person?.firstName ?? '';
	let lastName = person?.lastName ?? '';
	let dobUtc = person?.dobUtc ?? new Date();
	let tags = person?.tags ?? [];

	let dobInput: HTMLInputElement;

	const onDobChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const timeStr = e.currentTarget.value;
		const _selectedCity = selectedCity;
		if (_selectedCity && timeStr) {
			$dobStore = zonedTimeToUtc(timeStr, _selectedCity.tz);
		}
	};

	$: invalidYear = dobUtc && (dobUtc.getFullYear() < 1550 || dobUtc.getFullYear() > 2649);

	let cityQuery = writable('');
	const cities = citiesStore(cityQuery);
	let tagsInput = '';

	const selectCity = (city: GeoNamesCityType) => {
		selectedCity = city;
		cityQuery.set('');
		dobInput.focus();
	};

	const clearForm = () => {
		firstName = '';
		lastName = '';
		dobUtc = person?.dobUtc ?? new Date();
		selectedCity = null;
		tags = [];
		tagsInput = '';
		$cityQuery = '';
	};
</script>

<form {method} {action} use:enhance={response}>
	<div class="grid grid-cols-1">
		<label class="label">
			<span class="pl-4 prose">First, give them a name.</span>
			<input
				name="firstName"
				bind:value={firstName}
				required
				class="input"
				type="text"
				placeholder="First Name"
			/>
		</label>
		<label class="label mt-1.5">
			<input
				name="lastName"
				bind:value={lastName}
				class="input"
				type="text"
				placeholder="Last Name (optional)"
			/>
		</label>
		<input name="placeId" required value={selectedCity?._id} type="hidden" />
		<input name="dobUtc" required value={dobUtc?.valueOf()} type="hidden" />
		<input name="tz" required value={selectedCity?.tz} type="hidden" />

		{#each tags as tag}
			<input name="tags" value={tag} type="hidden" />
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
					bind:this={dobInput}
					value={$dobStringStore}
					on:change={onDobChange}
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
	<button type="submit" class="input btn variant-glass-secondary">
		<slot name="submit"> Create </slot>
	</button>
</form>

<style lang="postcss">
	label[for='dob'] {
		@apply text-xs text-error-700-200-token;
		display: none;
	}
</style>
