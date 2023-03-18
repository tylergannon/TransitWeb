<script lang="ts">
import { useForm } from "svelte-use-form";
import { enhance } from "$app/forms";

const url = "https://media.licdn.com/dms/image/C4D03AQHmVyYWuBZBuA/profile-displayphoto-shrink_800_800/0/1516252644819?e=2147483647&v=beta&t=srsC_bbtLygjWiCjotrmi1EMkH62ImLBrZjtTt557_8";

let showDropdown = false
let dropdownElement: HTMLLabelElement

const signOutForm = useForm({}, "signout")

function dropdownClicked(event: Event) {
	event.preventDefault()
	if (showDropdown) {
		dropdownElement.blur()
	}
	showDropdown = !showDropdown
}

</script>

<div>
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/app" class="btn btn-ghost normal-case text-xl">TransitHD</a>
		</div>
		<div class="flex-none gap-2">
			<div class="form-control">
				<input type="text" placeholder="Search" class="input input-bordered" />
			</div>
			<div class="dropdown dropdown-end " >
				<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-label-has-associated-control -->
				<label
					on:click={dropdownClicked}
					on:keydown={dropdownClicked}
					bind:this={dropdownElement}
					tabindex="0"
					class="btn btn-ghost btn-circle avatar"
				>
					<div class="w-10 rounded-full">
						<img src="{url}" alt="Profile" />
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-label-has-associated-control -->
				<ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					<li>
						<a class="justify-between"> Profile <span class="badge">New</span> </a>
					</li>
					<li><a>Settings</a></li>
					<li><form use:enhance use:signOutForm method="post" action="/sign-in?/signOut">
						<button type="submit">Log out</button>
					</form></li>
				</ul>
			</div>
		</div>
	</div>
	<slot />
</div>
