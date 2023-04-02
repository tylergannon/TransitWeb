<script lang="ts">
	/**
	 * Two changes I want:
	 *
	 * - [ ] Option to add an element on top of the list, if there is no exact match, which
	 * 		will call a cb with the current input value.
	 * - [x] Extract the "options" stuff into a provider component.
	*/

	export let navClasses = '';
	/** Provide arbitrary classes to each list. */
	export let listClasses = 'list-nav';
	/** Provide arbitrary classes to each list item. */
	export let regionButton = 'w-full';
	/** Provide arbitrary classes to empty message. */
	export let regionEmpty = 'text-center';

	// State
	// Reactive
	$: classesBase = `${$$props.class ?? ''}`;
</script>

<div class="autocomplete {$$props.class??''}" data-testid="autocomplete">
	<nav class="autocomplete-nav {navClasses}">
		<ul class="autocomplete-list {listClasses}">
			<slot />
		</ul>
	</nav>
</div>
