<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CalendarIcon from 'carbon-icons-svelte/lib/Calendar.svelte';
	import TimeIcon from 'carbon-icons-svelte/lib/Time.svelte';
	import AutoComplete from '$lib/components/AutoComplete.svelte';
	import type { Readable } from 'svelte/store';
	import type { CitySearchResult } from '$lib/db/citySearch';

	export let show: boolean;

	const dispatch = createEventDispatcher();

	let selectedCity: Readable<CitySearchResult>

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.set('timeZone', $selectedCity.tz);
		formData.set('placeId', $selectedCity.id);

		fetch('/api/people', {
			method: 'POST',
			body: formData
		}).then(() => {
			dispatch('close');
		});
	}
</script>

<div id="modal"
	class="modal {show
		? 'modal-open'
		: ''} fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-30 transition-all duration-300 ease-out"
>
	<div class="modal-box w-8/12 max-w-5xl">
		<form
			on:submit={handleSubmit}
			class="relative w-full p-8 bg-white rounded-lg daisyUI-modal"
		>
			<h3 class="mb-6 text-xl font-semibold">Add Person</h3>
			<div class="form-control">
				<label class="input-group input-group-lg">
					<span>First</span>
					<input type="text" placeholder="Type here" class="input input-bordered input-lg" />
				</label>
			</div>
			<div class="form-control">
				<label class="input-group input-group-lg">
					<span>Last</span>
					<input type="text" placeholder="Type here" class="input input-bordered input-lg" />
				</label>
			</div>
			<div class="form-control">
				<label class="input-group input-group-lg">
					<span><CalendarIcon size={20} /></span>
					<input type="date" placeholder="Type here" class="input input-bordered input-lg" />
				</label>

			</div>
			<div class="form-control flex-row">
				<label class="input-group input-group-lg">
					<span><TimeIcon size={20}/></span>
					<input type="time" placeholder="Type here" class="input input-bordered input-lg" />
				</label>
			</div>
			<div class="form-control flex-row">
				<AutoComplete bind:selectedCity={selectedCity} />
			</div>
			<button type="submit" class="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
				Submit
			</button>
		</form>
	</div>
</div>
