<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let show: boolean;

	const dispatch = createEventDispatcher();

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const data = {
			name: formData.get('name'),
			localDate: formData.get('localDate'),
			localTime: formData.get('localTime'),
			timeZone: formData.get('timeZone')
		};

		fetch('/api/people', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
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
	<div class="modal-box">
		<form
			on:submit={handleSubmit}
			class="relative w-full max-w-md p-8 bg-white rounded-lg daisyUI-modal"
		>
			<h3 class="mb-6 text-xl font-semibold">Add Person</h3>
			<div class="mb-4">
				<label for="name" class="block mb-2">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50 focus:outline-none"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="localDate" class="block mb-2">Local Date</label>
				<input
					id="localDate"
					name="localDate"
					type="date"
					class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50 focus:outline-none"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="localTime" class="block mb-2">Local Time</label>
				<input
					id="localTime"
					name="localTime"
					type="time"
					class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50 focus:outline-none"
					required
				/>
			</div>
			<div class="mb-6">
				<label for="timeZone" class="block mb-2">Time Zone</label>
				<input
					id="timeZone"
					name="timeZone"
					type="text"
					class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50 focus:outline-none"
					required
				/>
			</div>
			<button type="submit" class="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
				Submit
			</button>
		</form>
	</div>
</div>
