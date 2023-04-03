<script lang="ts">
	import AddPerson from './AddPerson.svelte';
</script>


<div class="grid grid-cols-6">
	<div class="card col-span-2 col-start-2 card-hover p-4">
		<div class="card-header">
			<h3 class="mb-6 text-xl font-semibold">New Record</h3>
		</div>
		<section>
			<AddPerson />
		</section>
	</div>
	<div class="col-span-4" />
</div>

