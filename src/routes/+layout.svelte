<script>
	import '../app.postcss';
</script>

<svelte:body
  />
<div class="app">

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
</style>

<slot />
