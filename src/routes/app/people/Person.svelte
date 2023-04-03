<script lang="ts">
	import type { ClientSidePerson } from "$lib/stores/people";
	import { ListBoxItem } from "@skeletonlabs/skeleton";
	import { utcToZonedTime } from "date-fns-tz";
  import type { Writable } from "svelte/store";
  export let person: Writable<ClientSidePerson>;
  export let group: string;
</script>

<ListBoxItem bind:group name="person" value={$person.slug}>
  {$person.firstName}

</ListBoxItem>
