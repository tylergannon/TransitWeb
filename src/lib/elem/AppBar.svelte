<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import AppBarLead from './AppBarLead.svelte';
	import AppBarTrail from './AppBarTrail.svelte';
	import AppBarMain from './AppBarMain.svelte';
</script>

<AppBar background="bg-gray-950 text-gray-50" spacing="space-y-2" padding="p-1">
  <div class="border-gray-50 text-gray-50">
  </div>
  <AppBarMain />

	<svelte:fragment slot="lead">
    <AppBarLead />
	</svelte:fragment>
	<svelte:fragment slot="headline">
	</svelte:fragment>
	<svelte:fragment slot="trail">
    <AppBarTrail />
	</svelte:fragment>
</AppBar>

