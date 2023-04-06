<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { ActionData } from './$types';
	import AddPerson from './AddPerson.svelte';

	afterNavigate(() => {
		(document.querySelector('input[name="firstName"]') as null|HTMLInputElement)?.focus();
	});

	export let form: ActionData;
</script>


<div class="grid grid-cols-6">
	<div class="card col-span-2 col-start-2 card-hover p-4">
		<div class="card-header">
			<h3 class="mb-6 text-xl font-semibold">New Record</h3>
		</div>
		<section>
			<AddPerson {form} />
		</section>
	</div>
	<div class="col-span-4" />
</div>

