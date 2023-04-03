<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import { fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// Types
	import type { CssClasses } from '@skeletonlabs/skeleton';

	// Event Dispatcher
	const dispatch = createEventDispatcher();

	// Props
	/** Bind the input value. */
	export let input = '';
	/**
	 * Set a unique select input name.
	 * @type {string}
	 */
	export let name: string;
	/** An array of values. */
	export let value: any[] = [];
	/**
	 * Provide a whitelist of accepted values.
	 * @type {string[]}
	 */
	export let whitelist: string[] = [];
	/** Maximum number of chips. Set -1 to disable. */
	export let max = -1;
	/** Set the minimum character length. */
	export let minlength = -1;
	/** Set the maximum character length. */
	export let maxlength = -1;
	/** When enabled, allows for uppercase values. */
	export let allowUpperCase = false;
	/** When enabled, allows for duplicate values. */
	export let allowDuplicates = false;
	/**
	 * Provide a custom validation function.
	 * @type {function}
	 */
	export let validation: (...args: any[]) => boolean = () => true;
	/** The duration of the animated fly effect. */
	export let duration = 150;
	/** Set the required state for this input field. */
	export let required = false;

	// Props (styles)
	/** Provide classes or a variant to style the chips. */
	export let chips: CssClasses = 'variant-filled';
	/** Provide classes used to indicate invalid state. */
	export let invalid: CssClasses = 'input-error';
	/** Provide classes to set padding styles. */
	export let padding: CssClasses = 'p-2';
	/** Provide classes to set border radius styles. */
	export let rounded: CssClasses = 'rounded-container-token';
  
  let form: HTMLFormElement;

	// Classes
	const cBase = 'textarea cursor-pointer';
	const cInterface = 'space-y-4';
	const cChipList = 'flex flex-wrap gap-2';
	const cInputField = 'unstyled bg-transparent border-0 !ring-0 p-0 w-full';

	// Local
	// let input = '';
	let inputValid = true;

  let inputField: HTMLInputElement;

	$: chipValues = value.map((val) => {
		return { val: val, id: Math.random() };
	}) as Array<{ val: (typeof value)[0]; id: number }>;

	function onInputHandler(): void {
		inputValid = true;
	}

	function validate(): boolean {
		if (!input) return false;
		// Format: trim value
		input = input.trim();
		// Custom validation
		if (validation !== undefined && !validation(input)) return false;
		// Maximum
		if (max !== -1 && value.length >= max) return false;
		// Minimum Character Length
		if (minlength !== -1 && input.length < minlength) return false;
		// Maximum Character Length
		if (maxlength !== -1 && input.length > maxlength) return false;
		// Whitelist (if available)
		if (whitelist.length > 0 && !whitelist.includes(input)) return false;
		// Value is unique
		if (allowDuplicates === false && value.includes(input)) return false;
		// State is valid
		return true;
	}
  


  const addChip = (val: string) => {
    // Validate
    const filteredVal = allowUpperCase ? val.trim() : val.trim().toLowerCase();
    value = [
      ...value,
      filteredVal
    ]
		dispatch('add', { chipIndex: value.length - 1, chipValue: filteredVal });
  };

	const submitForm = (event: Event) => {
		event.preventDefault();
		// Validate
		inputValid = validate();
		if (inputValid === false) return;
		// Format: to lowercase (if enabled)
    addChip(input);
		input = '';
	}

	function removeChipHandler(event: Event, chipIndex: number, chipValue: string): void {
		if ($$restProps.disabled) return;
		// Remove value from array
    value = [...value.slice(0, chipIndex), ...value.slice(chipIndex + 1)]
		/** @event {{ event: Event, chipIndex: number, chipValue: string }} remove - Fires when a chip is removed. */
		dispatch('remove', { event, chipIndex, chipValue });
	}

	// State
	$: classesInvalid = inputValid === false ? invalid : '';
	// Reactive
	$: classesBase = `${cBase} ${padding} ${rounded} ${$$props.class ?? ''} ${classesInvalid}`;
	$: classesInterface = `${cInterface}`;
	$: classesChipList = `${cChipList}`;
	$: classesInputField = `${cInputField}`;
</script>

<div class="input-chip {classesBase}" class:opacity-50={$$restProps.disabled}>
	<!-- NOTE: Don't use `hidden` as it prevents `required` from operating -->
	<div class="h-0 overflow-hidden">
		<select bind:value {name} multiple {required} tabindex="-1">
			<!-- NOTE: options are required! -->
			{#each value as option}<option value={option}>{option}</option>{/each}
		</select>
	</div>
	<!-- Interface -->
	<div class="input-chip-interface {classesInterface}">
		<!-- Input Field -->
		<form bind:this={form} on:submit={submitForm}>
			<input
				type="text"
        autocapitalize="off"
				bind:value={input}
        bind:this={inputField}
				placeholder={$$restProps.placeholder ?? 'Type a tag and choose below or <enter>.'}
				class="input-chip-field {classesInputField}"
				on:input={onInputHandler}
				on:input
				disabled={$$restProps.disabled}
			/>
		</form>
		<!-- Chip List -->
		{#if chipValues.length}
			<div class="input-chip-list {classesChipList}" transition:fly|local={{ duration, opacity: 0, y: -20 }}>
				{#each chipValues as { id, val }, i (id)}
					<!-- Wrapping div required for FLIP animation -->
					<div animate:flip={{ duration }}>
						<button
							type="button"
							class="chip {chips}"
							on:click={(e) => {
								removeChipHandler(e, i, val);
							}}
							on:click
							on:keypress
							on:keydown
							on:keyup
							transition:scale|local={{ duration, opacity: 0 }}
						>
							<span>{val}</span>
							<span>✕</span>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>