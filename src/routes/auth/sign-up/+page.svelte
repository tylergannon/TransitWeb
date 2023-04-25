<script lang="ts">
	import { enhance } from '$app/forms';
	import { theme } from '$lib/site-kit/components';

</script>

<h1>Let's Get Started!</h1>

<form action="" method="post" use:enhance class:dark={$theme.current === 'dark'}>
	<label for="firstName">First Name</label>
	<input
		type="text"
		name="firstName"
		placeholder="First name"
		required
		minlength="3"
		maxlength="100"
	/>
	<label for="lastName">Last Name</label>
	<input type="text" name="lastName" placeholder="Last name (optional)" />
	<label for="email">Email Address</label>
	<input type="email" required name="email" placeholder="you@somewherewonderful.com" />
	<label for="lastName">Password</label>
	<input
		type="password"
		name="password"
		placeholder=""
    required
    minlength="8"
		pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
	/>
	<span class="feedback">8 characters or more, with a mix of upper, lower case and numbers.</span>

	<button type="submit">Sign Up</button>
</form>

<style lang="postcss">
  @import "../auth.css";
  
</style>
