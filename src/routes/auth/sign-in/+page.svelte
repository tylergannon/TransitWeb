<script lang="ts">
	import { enhance } from "$app/forms";
	import type { Theme } from "$lib/site-kit/components/ThemeToggle.svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

  const theme: Writable<Theme> = getContext('theme');

</script>

<h1>Welcome Back!</h1>

<form action="" method="post" use:enhance class:dark={$theme.current === 'dark'}>
  <label for="email">Email</label>
  <input type="text" required name="email" placeholder="email" />
  <label for="password">Password</label>
  <input type="password" required name="password" placeholder="password" />
  <span>Incorrect username or password.  Need to reset your password?</span>
  <button type="submit">Sign In</button>
</form>

<style lang="postcss">
  @import "../auth.css";
</style>

