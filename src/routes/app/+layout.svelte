<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { UserType } from '$lib/srv/model';
	import type { PeopleStore } from '$lib/stores/people';
	import ProfileImgSvg from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import { setContext } from 'svelte';
	import { useForm } from 'svelte-use-form';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import NewChart from './NewChart.svelte';
	export let data: LayoutData;

	let showDropdown = false;
	let dropdownElement: HTMLLabelElement;
	let showNewChartModal = false;
	console.log("Inside layout", Object.keys(data.people))

	setContext('userProfile', writable<Partial<UserType>>(data.user));
	setContext('userPeople', writable<PeopleStore>(data.people));

	const signOutForm = useForm({}, 'signout');

	function toggleShowNewChart() {
		showNewChartModal = !showNewChartModal;
		console.log(`Toggle new chart ${showNewChartModal}`);
	}
	function dropdownClicked(event: Event) {
		event.preventDefault();
		if (showDropdown) {
			dropdownElement.blur();
		}
		showDropdown = !showDropdown;
	}
</script>

<div>
	<NewChart
		show={showNewChartModal}
		on:close={() => {
			showNewChartModal = false;
		}}
	/>
	<div class="navbar bg-slate-900">
		<div class="flex-1">
			<a href="/app" class="btn btn-ghost normal-case text-stone-100 text-xl">TransitHD</a>
		</div>
		<div class="flex-none gap-2">
			<button on:click={toggleShowNewChart} class="rounded-full btn btn-secondary btn-sm"
				>New Chart</button
			>
			<div class="form-control">
				<input type="text" placeholder="Search" class="input input-bordered input-sm rounded-md" />
			</div>
			<div class="dropdown dropdown-end ">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-label-has-associated-control -->
				<label
					on:click={dropdownClicked}
					on:keydown={dropdownClicked}
					bind:this={dropdownElement}
					tabindex="0"
					class="btn btn-ghost btn-circle avatar"
				>
					<div class="w-8 rounded-full">
						{#if data.user?.profileImg}
							<img src={data.user.profileImg} alt="Profile" />
						{:else}
							<ProfileImgSvg size={32} class="bg-gray-600" />
						{/if}
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-label-has-associated-control -->
				<ul
					tabindex="0"
					class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<a class="justify-between"> Profile <span class="badge">New</span> </a>
					</li>
					<li><a href="/app/settings" on:click={() => goto('/app/settings')}>Settings</a></li>
					<li>
						<form use:enhance use:signOutForm method="post" action="/sign-in?/signOut">
							<button type="submit">Log out</button>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<slot />
</div>
