<script lang="ts">
	import TextInputFieldset from '$lib/components/auth/InputFieldset.svelte';
	import AuthPage from '$lib/components/auth/Page.svelte';
	import { required, email } from 'svelte-use-form';

</script>

<AuthPage formAction="?/signIn" formName="signin">
	<div class="mb-4">
		<h2>Please sign in.</h2>
		<p>Welcome back, by the way.</p>
	</div>
	<div class="space-y-4">
		<TextInputFieldset
			name="email"
			label="Email"
			type="email"
			formName="signin"
			placeholder="you@email.com"
			validators={[required, email]}
			hints={{
				required: 'Your email address is required for sign in.',
				email: "The email address doesn't look right."
			}}
		/>
		<TextInputFieldset
			name="password"
			label="Password"
			type="password"
			formName="signin"
			placeholder="Please choose a strong password."
			validators={[ required ]}
			hints={{ required: 'Please enter your password.', }}
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
				SIGN IN
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
