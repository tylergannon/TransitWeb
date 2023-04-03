<script lang="ts">
  import { AppShell } from "@skeletonlabs/skeleton";
  import AppBar from "./AppBar.svelte";
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar  />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<slot name="sidebarLeft" />
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<slot name="pageHeader" />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<slot name="pageFooter" />
	</svelte:fragment>
	<svelte:fragment slot="footer">This is where my feet go.</svelte:fragment>
</AppShell>
