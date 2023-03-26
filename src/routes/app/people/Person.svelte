<script lang="ts">
	import type { ClientSidePerson } from "$lib/stores/people";
	import { utcToZonedTime } from "date-fns-tz";
  import type { Writable } from "svelte/store";
  export let person: Writable<ClientSidePerson>;
</script>

<div class="flex flex-row space-x-4">
  <div class="flex flex-col space-y-2">
    <div class="text-2xl font-semibold">
      <a href="/app/people/{$person.slug}">{$person.firstName} {$person.lastName}</a>
    </div>
    <div class="text-lg">{utcToZonedTime($person.dobUtc, $person.tz).toLocaleString()}</div>
  </div>
</div>
