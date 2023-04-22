<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import AppBarLead from './AppBarLead.svelte';
	import AppBarTrail from './AppBarTrail.svelte';
	import AppBarMain from './AppBarMain.svelte';
</script>

<AppBar spacing="space-y-2" padding="p-1">
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

