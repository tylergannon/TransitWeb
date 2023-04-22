<script lang="ts">

	import type { GeoNamesCityType } from '$lib/srv/model';
	import { zonedTimeToUtc } from 'date-fns-tz';

	import { derived, writable, type Writable } from 'svelte/store';
	import { formatDatetimeLocal } from './helper';

	import PersonTags from './PersonTags.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ClientSidePerson } from '$lib/stores/people';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import type { Evt } from '$lib/components/events';
	import Birthplace from './Birthplace.svelte';

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


	const onDobChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const timeStr = e.currentTarget.value;
		const _selectedCity = selectedCity;
		if (_selectedCity && timeStr) {
			$dobStore = zonedTimeToUtc(timeStr, _selectedCity.tz);
		}
	};


	$: invalidYear = dobUtc && (dobUtc.getFullYear() < 1550 || dobUtc.getFullYear() > 2649);
	let tagsInput = '';

  let dobInput: HTMLInputElement;


</script>

<form {method} {action} use:enhance={response}>
	<div class="grid gap-4 grid-cols-2 max-sm:grid-cols-1">
		<label class="label">
			<span >Enter a name.</span>
			<input
				name="firstName"
				bind:value={firstName}
				required
				class="input"
				type="text"
				placeholder="First Name"
			/>
		</label>
		<label class="label">
			<span class="text-transparent max-sm:hidden">Last name</span>
			<input
				name="lastName"
				bind:value={lastName}
				class="input"
				type="text"
				placeholder="Last Name (optional)"
			/>
		</label>
    <Birthplace bind:selectedCity />

    <label class="label mt-1.5">
      <span class="pl-4 prose">Date and time of birth.</span>
      <input
        bind:this={dobInput}
        value={$dobStringStore}
        on:change={onDobChange}
        on:blur={(e)=> {}}
        name="dob"
        required
        class:border-error-700={invalidYear}
        type="datetime-local"
        class="input"
        form=""
      />
      <label
        class="text-error-700-200-token"
        class:block={invalidYear} for="dob">
        Year must be between 1550 and 2649.
      </label>
    </label>

		<PersonTags bind:selected={tags} bind:tagsInput />
	</div>
	<button type="submit" class="input btn variant-glass-secondary">
		<slot name="submit"> Create </slot>
	</button>
  <input name="placeId" required value={selectedCity?._id} type="hidden" />
  <input name="dobUtc" required value={dobUtc?.valueOf()} type="hidden" />
  <input name="tz" required value={selectedCity?.tz} type="hidden" />

  {#each tags as tag}
    <input name="tags" value={tag} type="hidden" />
  {/each}
</form>

<style lang="postcss">
  label {
    @apply text-lg;
  }
	label[for='dob'] {
		@apply text-xs;
		display: none;
	}
</style>
