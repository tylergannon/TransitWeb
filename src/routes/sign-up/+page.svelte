<script lang="ts">
	import { PASSWORD_HINTS, PASSWORD_VALIDATORS } from '$lib/authHelper';
	import TextInputFieldset from '$lib/components/auth/InputFieldset.svelte';
	import AuthPage from '$lib/components/auth/Page.svelte';
	import { required, minLength, maxLength, email, pattern } from 'svelte-use-form';

</script>

<AuthPage formAction="?/signUp" formName="signup">
	<div class="mb-4">
		<h2>Please sign up to create your account.</h2>
		<p>We won't share your email with anyone.</p>
	</div>
	<div class="space-y-4">
		<TextInputFieldset
			name="firstName"
			label="Name"
			type="text"
			formName="signup"
			placeholder="What can we call you?"
			validators={[required, minLength(3), maxLength(100)]}
			hints={{
				required: 'Please tell us your name.',
				minLength: 'At least 3 characters.',
				maxLength: 'Not more than 100 characters.'
			}}
		/>
		<TextInputFieldset
			name="lastName"
			label="Last Name"
			type="text"
			formName="signup"
			placeholder="Your last name (optional)"
		/>
		<TextInputFieldset
			name="email"
			label="Email"
			type="email"
			formName="signup"
			placeholder="you@email.com"
			validators={[required, email]}
			hints={{
				required: 'Please enter a valid email address',
				email: "The email address doesn't look right."
			}}
		/>
		<TextInputFieldset
			name="password"
			label="Password"
			type="password"
			formName="signup"
			placeholder="Please choose a strong password."
			validators={PASSWORD_VALIDATORS}
			hints={PASSWORD_HINTS}
		/>
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<input
					id="remember_me"
					name="remember_me"
					type="checkbox"
					class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
				/>
				<label for="remember_me" class="ml-2 block text-sm text-gray-800"> Remember me </label>
			</div>
			<div class="text-sm">
				<a href="#" class="text-green-400 hover:text-green-500"> Forgot your password? </a>
			</div>
		</div>
		<div>
			<button
				type="submit"
				class="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
			>
				CREATE ACCOUNT
			</button>
		</div>
		<div class="divider" />
		<div>
			<button
				class="btn w-full flex justify-center bg-slate-900 hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
			>
				Sign in with Github
			</button>
		</div>
		<div>
			<button
				class="btn w-full flex justify-center bg-blue-900 hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
			>
				Sign in with Google
			</button>
		</div>
	</div>
	<div class="pt-5 text-center text-gray-400 text-xs">
		<span> Copyright © 2023 TransitHD </span>
	</div>
</AuthPage>
