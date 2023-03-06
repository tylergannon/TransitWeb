<script>
	import { signIn } from '@auth/sveltekit/client';
  let email = '';

  function clickEmail() {
    console.log(email);
    signIn('email', { email, callbackUrl: '/app' })
  }
</script>

<div class="h-full v-full bg-gray-200 flex justify-center">
	<div class="flex-none container">
		<div
			class="bg-no-repeat bg-cover bg-center relative"
			style="background-image: url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80);"
		>
			<div class="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0" />
			<div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
				<div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
					<div class="self-start hidden lg:flex flex-col  text-white">
						<img src="" class="mb-3" alt="" />
						<h1 class="mb-3 font-bold text-5xl">Welcome back!</h1>
						<p class="pr-3">Hey it's good you're here. Ready for more fun?</p>
					</div>
				</div>
				<div class="flex justify-center self-center  z-10">
					<div class="p-12 bg-white mx-auto rounded-2xl w-100 prose">
						<div class="mb-4">
							<h2>Please sign in to your account.</h2>
              <p>
                Enter your email address and we'll send you a sign-in link,
                otherwise click below to use a third party login.
              </p>
              <p>We won't share your email with anyone.</p>
						</div>
						<div class="space-y-5">
							<div class="space-y-2">
								<label for="email" class="text-sm font-medium text-gray-700 tracking-wide"
									>Email</label
								>
								<input
									name="email"
									class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
									type=""
                  bind:value="{email}"
									placeholder="you@example.com"
								/>
							</div>
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
									<a href="#" class="text-green-400 hover:text-green-500">
										Forgot your password?
									</a>
								</div>
							</div>
							<div>
								<button
                  on:click={() => signIn('email', { email, callbackUrl: '/app' })}
									type="submit"
									class="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
								>
									SIGN IN
								</button>
							</div>
							<div class="divider" />
							<div>
                <button>{email}</button>
								<button
									class="btn w-full flex justify-center bg-slate-900 hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  on:click={() => signIn('github', { callbackUrl: '/app' })}
								>
									Sign in with Github
								</button>
							</div>
							<div>
								<button
									class="btn w-full flex justify-center bg-blue-900 hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  on:click={() => signIn('github', { callbackUrl: '/app' })}
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
		</div>
	</div>
</div>

