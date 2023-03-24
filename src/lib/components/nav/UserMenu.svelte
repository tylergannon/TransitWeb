<script lang="ts">
  import Settings from "carbon-icons-svelte/lib/Settings.svelte";
</script>
<div class="card p-4" data-popup="userMenu">
	<nav class="list-nav">
		<!-- (optionally you can provde a label here) -->
		<ul>
			<li>
				<a href="/app/settings">
					<span><Settings /></span>
					<span class="flex-auto">Settings</span>
				</a>
			</li>
			<!-- ... -->
		</ul>
	</nav>
</div>
