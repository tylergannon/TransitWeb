<script lang="ts">
	/**
	 * Two changes I want:
	 *
	 * - [ ] Option to add an element on top of the list, if there is no exact match, which
	 * 		will call a cb with the current input value.
	 * - [x] Extract the "options" stuff into a provider component.
	*/
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	const dispatch = createEventDispatcher();

	// Types
	import type { AutoCompleteOption, AutoCompleteProvider } from './types';

	// Props
	/**
	 * Bind the input value.
	 * @type {string}
	 */
	export let input = '';
	/**
	 * Provides the options to display.
	 * @type {AutoCompleteProvider}
	 */
	export let options: AutoCompleteProvider;
	/** Provide a HTML markup to display when no match is found. */
	export let emptyState = 'No Results Found.';
	/** Set the animation duration. Use zero to disable. */
	export let duration = 200;
	// Props (region)
	/** Provide arbitrary classes to nav element. */
	export let regionNav = '';
	/** Provide arbitrary classes to each list. */
	export let regionList = 'list-nav';
	/** Provide arbitrary classes to each list item. */
	export let regionItem = '';
	/** Provide arbitrary classes to each button. */
	export let regionButton = 'w-full';
	/** Provide arbitrary classes to empty message. */
	export let regionEmpty = 'text-center';


	function onSelection(option: AutoCompleteOption) {
		/** @event {AutocompleteOption} selection - Fire on option select. */
		dispatch('selection', option);
	}
	let optionsFiltered: AutoCompleteOption[] = [];

	$: {
		const temp = options(input);
		if (temp instanceof Promise) {
			temp.then((res) => {
				optionsFiltered = res;
			});
		} else {
			optionsFiltered = temp;
		}
	}

	// State
	// Reactive
	$: classesBase = `${$$props.class ?? ''}`;
	$: classesNav = `${regionNav}`;
	$: classesList = `${regionList}`;
	$: classesItem = `${regionItem}`;
	$: classesButton = `${regionButton}`;
	$: classesEmtpy = `${regionEmpty}`;
</script>

<div class="autocomplete {classesBase}" data-testid="autocomplete">
	{#if optionsFiltered.length > 0}
		<nav class="autocomplete-nav {classesNav}">
			<ul class="autocomplete-list {classesList}">
				{#each optionsFiltered as option, i (option)}
					<li class="autocomplete-item {classesItem}" animate:flip={{ duration }} transition:slide|local={{ duration }}>
						<button class="autocomplete-button {classesButton}" type="button" on:click={() => onSelection(option)} on:click on:keypress>
							{@html option.label}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	{:else}
		<div class="autocomplete-empty {classesEmtpy}">{emptyState}</div>
	{/if}
</div>
