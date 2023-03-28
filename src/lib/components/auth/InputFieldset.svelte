<script lang="ts">
	import { Hint } from 'svelte-use-form';
	import { validators as formValidators, type ValidationErrors } from 'svelte-use-form';

	interface Validator {
		(value: string): null | ValidationErrors;
	}
	type EventArgs = Event & { currentTarget: EventTarget & HTMLInputElement };
	type OnChangeHandler = (e: EventArgs) => void;

	export let name: string;
	export let label: string;
	export let type = 'text';
	export let validators: Validator[] = [];
	export let hints: Record<string, string> = {};
	export let moreClasses = '';
	export let value = '';
	export let placeholder = '';
	export let formName = 'form';
	export let onChange: OnChangeHandler | null = null;
</script>

<span>
	<label class="label">
		<span>{label}</span>
		<input
			use:formValidators={validators}
			{name}
			class="input rounded-full {moreClasses}"
			{type}
			on:keyup={(a) => {
				value = a.currentTarget.value;
				onChange && onChange(a);
			}}
			{placeholder}
		/>
	</label>
	<label for="name" class="label">
		{#each Object.keys(hints) as rule}
			<Hint for={name} form={formName} on={rule}>
				<span class="label-text group-valid:hidden text-error">{hints[rule]}</span>
			</Hint>
		{/each}
	</label>
</span>

<style>
	.input:focus {
		outline: 0;
	}
</style>
