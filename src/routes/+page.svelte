<script lang="ts">
	import AppBar from "$lib/elem/AppBar.svelte";


</script>
<svelte:head>
  <title>TransitHD - Hello Good Sky!</title>
</svelte:head>


<div>
  <AppBar />

  <div class="h-full v-full items-center">
    <div class="flex hero min-h-screen items-center justify-center">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class=" prose">
          <h1 class="mb-5 text-5xl font-bold">Discover Keys You Can Use To Understand Your Relationships</h1>
          <p class="mb-5 prose">
            Human Design is a model of personality developed in the 20th century
            to aid in a fundamental shift in human consciousness, promoting the
            understanding that each personality, even "problematic" ones, actually
            plays an important role in the world.
          </p>
          <a href="/sign-up" class="btn variant-soft-primary">Sign up now!</a>
          <a href="/sign-in" class="btn bg-secondary-400">I have an account</a>
        </div>
      </div>
    </div>
  </div>
</div>
