<script lang="ts">
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<nav class="list-nav">
	<!-- (optionally you can provde a label here) -->
	<ul>
		<li>
			<a href="/app/settings">
				<span><Settings /></span>
				<span class="flex-auto">Settings</span>
			</a>
		</li>
		<li><LightSwitch /></li>
		<!-- ... -->
	</ul>
</nav>
