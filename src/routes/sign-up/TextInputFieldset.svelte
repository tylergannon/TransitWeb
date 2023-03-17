<script lang="ts">
  import { Hint } from 'svelte-use-form'
  import { validators as formValidators, type ValidationErrors } from 'svelte-use-form'

  interface Validator {
    (value: string): null | ValidationErrors;
  }

	export let name: string;
  export let label: string;
  export let type = "text"
  export let validators: Validator[] = []
  export let hints: Record<string, string> = {}
  export let moreClasses = ""
  export let value = ""
  export let placeholder = ""
  export let formName = "form"
</script>

<div class="form-control w-full max-w-xs">
	<fieldset class="group">
    <label for="{name}" class="label"><span class="label-text">{label}</span></label>
      <input use:formValidators={validators}
        name="{name}"
        type="{type}"
        placeholder="{placeholder}"
        on:change={(a) => { value = a.currentTarget.value }}
        class="input input-bordered w-full focus:border-secondary-focus {moreClasses}"
      />
		<label for="name" class="label">
      {#each Object.keys(hints) as rule}
        <Hint for="{name}" form={formName} on="{rule}">
          <span class="label-text group-valid:hidden text-error">{hints[rule]}</span>
        </Hint>
      {/each}
		</label>
	</fieldset>
</div>
