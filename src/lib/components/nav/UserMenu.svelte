<script lang="ts">
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
  import Logout from "carbon-icons-svelte/lib/Logout.svelte";
  import { enhance } from '$app/forms';


</script>

<nav class="border-surface-400-500-token text-surface-900-50-token list-nav">
	<ul>
		<li class="pt-2 px-2">
			<a href="/app/settings">
				<span><Settings /></span>
				<span class="flex-auto">Settings</span>
			</a>
		</li>
		<li class="flex-1 p-2 pt-1 relative">
			<div class="ml-1 absolute top-[30%] left-4"><LightSwitch height={"h-4"} width={"w-8"} /> </div>
			<button type="button" on:click class="w-full">
				<span class="text-sm pl-12">🌞/🌛</span>
			</button>
		</li>
    <li class="px-2">
      <form action="/sign-in?/signOut" method="post" use:enhance >
        <button type="submit" class="flex flex-row w-full">
          <span><Logout /></span>
          <span class="flex-auto">Sign out</span>
        </button>

      </form>
    </li>
	</ul>
</nav>

<style lang="postcss">
	nav {
		/* apply w-36; */
		/* apply rounded-t-none rounded-b-md; */
		/* apply bg-white dark:bg-black; */
		border-style: solid;
		border-width: 0.05rem;
		border-top-width: 0;
	}
</style>
