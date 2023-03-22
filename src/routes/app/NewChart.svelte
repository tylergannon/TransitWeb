<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CalendarIcon from 'carbon-icons-svelte/lib/Calendar.svelte';
	import TimeIcon from 'carbon-icons-svelte/lib/Time.svelte';
	import AutoComplete from '$lib/components/AutoComplete.svelte';
	import type { Writable } from 'svelte/store';
	import type { GeoNamesCityType, PersonType, UserType } from '$lib/srv/model';
	import { zonedTimeToUtc } from 'date-fns-tz';
	import { getContext } from 'svelte';

	const people = getContext('userPeople') as Writable<PersonObj[]>;
	export let show: boolean;

	const dispatch = createEventDispatcher();

	let selectedCity: GeoNamesCityType|null = null;
	let currTime = '';
	let currDate = '';
	let firstName = '';
	let lastName = '';
	let dobUtc: Date|null = null;

	$: {
		if (currTime && currDate && selectedCity) {
			dobUtc = zonedTimeToUtc(`${currDate} ${currTime}`, selectedCity.tz);
		}
	}
	type PersonObj = Omit<PersonType, 'userId'>;

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!dobUtc) return;
		const personObj: PersonObj = {
			firstName,
			lastName,
			dobUtc,
			tz: selectedCity!.tz,
			placeId: selectedCity!._id,
			tags: []
		};

		fetch('/app/api/people', {
			method: 'POST',
			body: new URLSearchParams({
				...personObj,
				dobUtc: dobUtc.toISOString(),
				tags: personObj.tags.join(','),
				placeId: personObj.placeId.toString()
			})
		}).then(() => {
			try {
				people.update((people) => {
					people.push(personObj);
					return people;
				});
				dispatch('close');
			} catch (e) {
				alert(`Error: ${e}`)
				console.error(e);
			}
		});
	}
</script>

<div
	id="modal"
	class="modal {show
		? 'modal-open'
		: ''} fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-30 transition-all duration-300 ease-out"
>
	<div class="modal-box w-8/12 max-w-5xl">
		<form on:submit={handleSubmit} class="relative w-full p-8 bg-white rounded-lg daisyUI-modal">
			<h3 class="mb-6 text-xl font-semibold">Add Person</h3>
			<div class="form-control">
				<label class="input-group input-group-lg">
					<span>First</span>
					<input
						bind:value={firstName}
						type="text"
						placeholder="Type here"
						class="input input-bordered input-lg"
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="input-group input-group-lg">
					<span>Last</span>
					<input
						bind:value={lastName}
						type="text"
						placeholder="Type here"
						class="input input-bordered input-lg"
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="input-group input-group-lg">
					<span><CalendarIcon size={20} /></span>
					<input
						bind:value={currDate}
						type="date"
						placeholder="Type here"
						class="input input-bordered input-lg"
					/>
				</label>
			</div>
			<div class="form-control flex-row">
				<label class="input-group input-group-lg">
					<span><TimeIcon size={20} /></span>
					<input
						bind:value={currTime}
						type="time"
						placeholder="Type here"
						class="input input-bordered input-lg"
					/>
					<span>
						{#if dobUtc}
							{dobUtc.toLocaleString()}
						{/if}
					</span>
				</label>
			</div>
			<div class="form-control flex-row">
				<AutoComplete bind:result={selectedCity} />
			</div>
			<button type="submit" class="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
				Submit
			</button>
		</form>
	</div>
</div>
