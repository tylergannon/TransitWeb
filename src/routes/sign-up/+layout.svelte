<script lang="ts">
	import AppBarLead from '$lib/elem/AppBarLead.svelte';
import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar >

	<svelte:fragment slot="lead">
    <AppBarLead />
	</svelte:fragment>
	<svelte:fragment slot="headline">
	</svelte:fragment>
	<svelte:fragment slot="trail">
	</svelte:fragment>
</AppBar>




<slot />

