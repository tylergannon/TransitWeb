<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import IncompleteCancel from 'carbon-icons-svelte/lib/IncompleteCancel.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';

	import type { UserType } from '$lib/srv/model';

	import UserMenu from '$lib/components/nav/UserMenu.svelte';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	const userProfile: Writable<UserType> = getContext('userProfile');

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'userMenu',
		placement: 'bottom-end'
	};
</script>

<AppBar>
	<div class="flex items-center space-x-4 divide-x lg:pl-8">
		<a href="/app/people">People</a>
		<a href="/app/people/new" class="pl-4">New Person</a>
	</div>

	<svelte:fragment slot="lead">
		<div class="flex items-center space-x-4">
			<a href="/app" class="lg:!ml-0 w-[32px] lg:w-auto overflow-hidden flex flex-row space-x-2">
				<span><IncompleteCancel size={32} /></span>
				<span class="lg:h-8 lg:pt-1">TransitHD</span>
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="headline">
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<button
			type="button"
			class="btn hover:text-secondary-600"
			use:popup={popupSettings}
			id="userMenu"

		>
			<span><UserAvatarFilledAlt size={24} /></span>
			<span>Me</span>
		</button>
		<div class="card p-4" data-popup="userMenu">
			<UserMenu />
		</div>
	</svelte:fragment>
</AppBar>
