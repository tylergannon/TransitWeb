<script lang="ts">
  import PageHeader from "./PageHeader.svelte";
	import { useForm } from "svelte-use-form";
	import { enhance } from "$app/forms";
	import { actionChain } from "./funcs"

  export let formAction: string;
	export let formName = "form"

  const form = useForm({}, formName);

</script>
<div>
	<PageHeader />
	<form method="post" use:actionChain={[enhance, form]} action="{formAction}" >
		<div class="min-h-screen bg-base-300 dark:bg-black sm:flex sm:flex-row mx-0 justify-center">
			<div class="flex justify-center self-center  z-10">
				<div class="p-12 mx-auto rounded-2xl w-100 prose">
					<slot></slot>
				</div>
			</div>
		</div>
	</form>
</div>
