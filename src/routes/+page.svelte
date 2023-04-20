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
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Transit HD</h1>
          <p class="mb-5">It will be pretty expensive but you're worth it.</p>
          <a href="/sign-up" class="btn btn-primary">Sign up now!</a>
          <a href="/sign-in" class="btn btn-secondary">I have an account</a>
        </div>
      </div>
    </div>
  </div>
</div>
