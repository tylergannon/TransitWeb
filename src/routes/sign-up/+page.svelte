<script lang="ts">
	import TextInputFieldset from './TextInputFieldset.svelte';
	import { useForm, required, minLength, maxLength, email, pattern } from "svelte-use-form";

  const form = useForm({}, "signup");

</script>

<div>
	<div class="navbar bg-base-200">
		<a href="#" class="btn btn-ghost normal-case text-xl">TransitHD</a>
		<div class="navbar-center">Hello, good sky!</div>
	</div>
	<form method="post" use:form >
		<div class="min-h-screen bg-base-300 dark:bg-black sm:flex sm:flex-row mx-0 justify-center">
			<div class="flex justify-center self-center  z-10">
				<div class="p-12 mx-auto rounded-2xl w-100 prose">
					<div class="mb-4">
						<h2>Please sign up to create your account.</h2>
						<p>We won't share your email with anyone.</p>
					</div>
					<div class="space-y-4">
						<TextInputFieldset
							name="name"
							label="Name"
							type="text"
							formName="signup"
							placeholder="What can we call you?"
							validators={[required, minLength(3), maxLength(100)]}
							hints={{
								"required": "Please tell us your name.",
								"minLength": "At least 3 characters.",
								"maxLength": "Not more than 100 characters."
							}}
						/>
						<TextInputFieldset
							name="email"
							label="Email"
							type="email"
							formName="signup"
							placeholder="you@email.com"
							validators={[required, email]}
							hints={{required: "Please enter a valid email address", email: "The email address doesn't look right."}}
						/>
						<TextInputFieldset
							name="password"
							label="Password"
							type="password"
							formName="signup"
							placeholder="Please choose a strong password."
							validators={[required, minLength(8), maxLength(40), pattern("a-z"), pattern("A-Z"), pattern( '[\\d;!@#$%&-\'".,`~:]')]}
							hints={{
								required: "Please supply a strong password.",
								minLength: "At least 8 characters.",
								maxLength: "Not more than 40 characters.",
								pattern: "At least one upper, one lower, one number."
							}}
						/>
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="remember_me"
									name="remember_me"
									type="checkbox"
									class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
								/>
								<label for="remember_me" class="ml-2 block text-sm text-gray-800">
									Remember me
								</label>
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
				</div>
			</div>
		</div>
	</form>
</div>

<style>
	.input:focus {
		outline: 0;
	}
</style>
