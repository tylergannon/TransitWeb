<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import { applyAction, enhance } from '$app/forms';

	import type { GeoNamesCityType } from '$lib/srv/model';
	import type { ClientSidePerson } from '$lib/stores/people';

	import PersonTags from './PersonTags.svelte';
	import Birthplace from './Birthplace.svelte';

  import { dtLocalWithTz } from "./dateTimeLocal";

	type PersonFormEvents = {
		submit: Omit<ClientSidePerson, '_id' | 'slug'>;
	};

	const dispatch = createEventDispatcher<PersonFormEvents>();

	export let person: ClientSidePerson | null = null;
	export let selectedCity: GeoNamesCityType | null = null;
	export let action: string;
	export let method = 'POST';

	const response = (() => async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success') {
      dispatch('submit', {
        dobUtc: $dobUtc as Date,
        tags,
        firstName,
        lastName,
        placeId: (selectedCity as GeoNamesCityType)._id,
        tz: (selectedCity as GeoNamesCityType).tz
      });
		}
	}) satisfies SubmitFunction;


	let firstName = person?.firstName ?? '';
	let lastName = person?.lastName ?? '';
	let dobUtc = dtLocalWithTz(person?.dobUtc ?? new Date());
	let tags = person?.tags ?? [];
	let tagsInput = '';
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
        name="dob"
        use:dobUtc={selectedCity?.tz}
        required
        type="datetime-local"
        class="input"
        form=""
      />
      <label
        class="input-feedback text-error-700-200-token" for="dob">
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
  input:invalid {
    @apply border-error-700 dark:border-error-200;
  }
  input:invalid ~ .input-feedback {
    display: block;
  }
  label.input-feedback {
		@apply text-xs;
		display: none;
	}
</style>
