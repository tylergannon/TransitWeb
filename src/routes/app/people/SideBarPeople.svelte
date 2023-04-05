<script lang="ts">
	import type { PersonStore } from "$lib/stores/people";
  export let userPeople: Record<string, PersonStore>;

  let group = '';

</script>

<ul>
  {#each Object.entries(userPeople) as [slug, person] (slug)}
    <li>
      <a href="/app/people/{person.slug}">
        {person.firstName} {person.lastName}
      </a>
    </li>
  {/each}
</ul>
