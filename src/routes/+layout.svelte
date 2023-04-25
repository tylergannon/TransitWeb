<script lang="ts">
	import '../app.postcss';
	import { Nav, NavItem, Separator, Shell } from '$lib/site-kit/components';
  

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { handleSession } from '@lucia-auth/sveltekit/client';

	import type { LayoutData } from './$types';
	import type { UserType } from '$lib/srv/model';
	import { UserAvatar } from 'carbon-icons-svelte';

	export let data: LayoutData;

	handleSession(page);

	setContext(
		'userProfile',
		writable<UserType | null>(
			data.user
				? {
						...data.user,
						dobUtc: data.user.dobUtc ? new Date(parseInt(data.user.dobUtc)) : undefined,
						tags: data.user.tags || []
				  }
				: null
		)
	);
</script>

<Shell banner_bottom_height="100px" >
	<Nav slot="top-nav">
		<svelte:fragment slot="home">
			<strong>transit</strong>hd.com
		</svelte:fragment>
		<svelte:fragment slot="nav-center">
			{#if !data.user}
				<NavItem href="/auth/sign-up">
					<span class="primary">Sign Up</span>
					<svelte:fragment slot="small">Sign Up</svelte:fragment>
				</NavItem>
				<Separator />
				<NavItem href="/auth/sign-in">
					<span class="secondary">Sign In</span>
					<svelte:fragment slot="small">Sign In</svelte:fragment>
				</NavItem>
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="nav-right">
			{#if data.user}
        <NavItem href="/app/settings">
          <UserAvatar size={24} />
          <svelte:fragment slot="small">
            <UserAvatar size={24} />
            User Settings
          </svelte:fragment>
        </NavItem>
      {/if}
		</svelte:fragment>
	</Nav>
  <svelte:fragment slot="banner-bottom">
    <a href="/app/"> Go To Heaven </a>

  </svelte:fragment>
	<slot />
</Shell>

<style>
	:global(body) {
		margin: 0;
		width: 100%;
		min-height: 100dvh;
	}

  li {
    display: flex;
    align-items: center;
  }

	span {
		padding: 10px;
		border: 1px var(--tw-3) solid;
		border-radius: 8px;
		font-weight: 700;
		min-width: 90px;
		display: inline-block;
		color: var(--tw-0);
		text-align: center;
	}
	span.primary {
		background-color: var(--tw-7);
	}
	span:hover {
		border-width: 3px;
		text-decoration: underline;
	}
</style>

