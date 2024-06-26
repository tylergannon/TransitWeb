<!-- @component
Top navigation bar for the application. It provides a slot for the left side, the right side, and the center.
-->
<script>
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
	import Icon from './Icon.svelte';
	import Separator from './Separator.svelte';

	export let home_title = 'Homepage';

	let open = false;
	let visible = true;

	/** @type {HTMLElement} */
	let nav;

	// hide nav whenever we navigate
	page.subscribe(() => {
		open = false;
	});

	// Prevents navbar to show/hide when clicking in docs sidebar
	let hash_changed = false;
	function handle_hashchange() {
		hash_changed = true;
	}

	let last_scroll = 0;
	function handle_scroll() {
		const scroll = window.pageYOffset;
		if (!hash_changed) {
			visible = scroll < 50 || scroll < last_scroll;
		}

		last_scroll = scroll;
		hash_changed = false;
	}

	function handle_focus() {
		if (open && !nav.contains(document.activeElement)) {
			open = false;
		}
	}
</script>

<svelte:window
	on:hashchange={handle_hashchange}
	on:scroll={handle_scroll}
	on:focusin={handle_focus}
/>

{#if open}
	<div
		class="modal-background hide-if-desktop"
		on:click={() => (open = false)}
		on:keydown={(e) => e.key === ' ' && (open = false)}
	/>
{/if}

<nav class:visible={visible || open} class:open bind:this={nav} aria-label="Primary">
	<a href="/" class="nav-spot home" title={home_title}>
		<slot name="home" />
	</a>

	<button
		aria-label="Toggle menu"
		aria-expanded={open}
		class="menu-toggle"
		class:open
		on:click={() => (open = !open)}
	>
		<Icon name={open ? 'close' : 'menu'} size="1em" />
	</button>

	<ul class="menu-section">
		<slot name="nav-center" />
	</ul>

	<div class="external menu-section">
		<ul>
			<slot name="nav-right" />
			<Separator />
		</ul>
		<div class="appearance">
			<span class="caption">Theme</span>
			<ThemeToggle />
		</div>
	</div>
</nav>

<style>
	.modal-background {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: var(--sk-back-1);
		opacity: 0.8;
		z-index: 2;
		backdrop-filter: grayscale(0.5) blur(2px);
	}

	nav {
		--shadow-height: 0.5rem;
		--shadow-gradient: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.05) 30%,
			transparent 100%
		);
		position: fixed;
		top: 0;
		width: 100vw;
		height: var(--sk-nav-height);
		margin: 0 auto;
		background-color: var(--sk-back-2);
		font-family: var(--sk-font);
		z-index: 100;
		user-select: none;
		transition: transform 0.2s;
	}

	nav::after {
		content: '';
		position: absolute;
		width: 100%;
		height: var(--shadow-height);
		left: 0;
		bottom: calc(-1 * var(--shadow-height));
		background: var(--shadow-gradient);
	}

	@media (max-width: 800px) {
		nav:not(.visible):not(:focus-within) {
			transform: translate(
				0,
				calc(-100% - 5rem)
			); /* TODO revert 5rem to 1rem after we remove the banner */
		}
	}

	.menu-section {
		position: relative;
		width: 100%;
	}

	ul {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	ul :global(a) {
		color: var(--sk-text-2);
		line-height: 1;
	}

	.home {
		height: var(--sk-nav-height);
		display: flex;
		background-image: url(../branding/transit-hd-logo.svg);
		background-position: calc(var(--sk-page-padding-side) - 1rem) 50%;
		background-repeat: no-repeat;
		background-size: auto 70%;
		align-items: center;
		padding-left: calc(var(--sk-page-padding-side) + 4rem);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 1.8rem;
		color: var(--sk-text-4);
	}

	.home :global(strong) {
		color: var(--sk-text-1);
		font-weight: inherit;
	}

	button {
		position: absolute;
		top: calc(var(--sk-nav-height) / 2 - 1rem);
		right: var(--sk-page-padding-side);
		line-height: 1;
	}

	.appearance {
		display: flex;
		height: 100%;
		align-items: center;
		margin-left: 0.75rem;
		/* transform: translateY(2px); */
	}

	.appearance .caption {
		display: none;
		font-size: var(--sk-text-xs);
		line-height: 1;
		margin-right: 0.5rem;
	}

	@media (max-width: 799px) {
		.menu-section {
			position: relative;
			display: none;
			width: 100%;
			background: var(--sk-back-1);
			padding: 1rem var(--sk-page-padding-side);
		}

		.open .menu-section {
			display: block;
		}

		.external {
			padding: 1rem var(--sk-page-padding-side) 1rem;
		}

		.external::before {
			content: '';
			position: absolute;
			top: 0;
			left: var(--sk-page-padding-side);
			width: calc(100% - 2 * var(--sk-page-padding-side));
			height: 1px;
			background: radial-gradient(circle at center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
		}

		.external::after {
			content: '';
			position: absolute;
			width: 100%;
			height: var(--shadow-height);
			left: 0;
			bottom: calc(-1 * var(--shadow-height));
			background: var(--shadow-gradient);
		}

		.appearance {
			justify-content: space-between;
			align-items: center;
			margin: 10px 0 0;
			padding: 1rem 1.25rem;
			background: var(--sk-back-3);
			border-radius: 3.5rem;
		}

		.appearance .caption {
			display: block;
		}
	}

	@media (min-width: 800px) {
		.modal-background {
			display: none;
		}

		nav {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			/* align-items: center; */
			/* justify-content: space-between; */
		}

		ul,
		.menu-section {
			display: flex;
			width: auto;
			height: 100%;
		}

		ul :global(li) {
			margin: 0 0.5rem;
			padding: 0;
		}

		ul :global(a) {
			display: flex;
			align-items: center;
			height: 100%;
		}

		.external {
			padding: 0 var(--sk-page-padding-side) 0 0;
			justify-content: end;
		}

		button {
			display: none;
		}
	}
</style>
