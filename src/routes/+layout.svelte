<script>
	import '../app.postcss';
</script>

<svelte:body />
<div class="flex h-screen flex-col bg-base-100 dark:bg-black-900">
  <div class="navbar bg-base-200">
    <a href="#" class="btn btn-ghost normal-case text-xl">TransitHD</a>
    <div class="navbar-center">Hello, good sky!</div>
  </div>

	<main class="flex-1">
		<slot />
	</main>

	<footer>
		<p>This is where my feet go.</p>
	</footer>
</div>

<style>
</style>

