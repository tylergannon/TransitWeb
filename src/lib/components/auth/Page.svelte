<script lang="ts">
	import { useForm } from "svelte-use-form";
	import { enhanceForm } from "../helper"

  export let formAction: string;
	export let formName = "form"

  const form = useForm({}, formName);

</script>
<div>
	<form method="post" use:enhanceForm={form} action="{formAction}" >
		<div class="min-h-screen bg-base-300 dark:bg-black sm:flex sm:flex-row mx-0 justify-center">
			<div class="flex z-10">
				<div class="p-12 mx-auto rounded-2xl w-100 prose">
					<slot></slot>
				</div>
			</div>
		</div>
	</form>
</div>
