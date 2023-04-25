<!-- @component
The main shell of the application. It provides a slot for the top navigation, the main content, and the bottom banner.
-->
<script lang="ts">
	console.log('sdsd:w');
  import { BROWSER } from 'esm-env';
	import { navigating } from '$app/stores';
	import { setContext } from 'svelte';
	import { initialTheme, type Theme } from './ThemeToggle.svelte';
	import '../styles/index.css';
	import Icons from './Icons.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';
	import SkipLink from './SkipLink.svelte';
	import { persisted } from 'svelte-local-storage-store';

	const theme = persisted<Theme>('theme', initialTheme());


	setContext('theme', theme);

  function otherTheme(setting: 'dark'|'light') {
    return setting === 'dark' ? 'light' : 'dark';
  }

	$: {
    if (BROWSER) {
      document.body.classList.remove(otherTheme($theme.current));
      document.body.classList.add($theme.current);
      document.body.dataset["theme"] = $theme.current;
    }
	}
	/**
	 * Height of the bottom banner. If '0px', the banner is not visible.
	 */
	export let banner_bottom_height = '0px';

	// import { theme } from '$lib/site-kit/components';
	/**
	 * Whether the navigation is visible.
	 */
	export let nav_visible = true;
</script>

<div>
	<Icons />

	{#if $navigating}
		<PreloadingIndicator />
	{/if}

	{#if nav_visible}
		<SkipLink href="#main" />

		<slot name="top-nav" />
	{/if}

	<main
		id="main"
		style:--sk-banner-bottom-height={banner_bottom_height}
		data-theme={$theme.current}
	>
		<slot />
	</main>

	{#if banner_bottom_height !== '0px'}
		<div style:--sk-banner-bottom-height={banner_bottom_height} style:height={banner_bottom_height}>
			<slot name="banner-bottom" {banner_bottom_height} />
		</div>
	{/if}
</div>

<style>
	main {
		position: relative;
		margin: 0 auto;
		width: 100%;
		flex: 1;
		padding-top: var(--sk-nav-height);
		padding-bottom: var(--sk-banner-bottom-height);
		overflow: hidden;
	}

	:global(body) {
		font-size: 1.6rem !important;
	}
</style>
