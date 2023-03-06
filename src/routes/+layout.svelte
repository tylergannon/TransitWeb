<script>
	import '../app.postcss';
</script>

<svelte:body />
<div class="flex h-screen flex-col bg-base-100 dark:bg-black-900">

	<main class="flex-1">
		<slot />
	</main>

	<footer>
		<p>This is where my feet go.</p>
	</footer>
</div>

<style>
</style>

