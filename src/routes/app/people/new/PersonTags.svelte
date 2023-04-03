<script lang="ts">
	import type { UserType } from '$lib/srv/model';
	import CaretRight from 'carbon-icons-svelte/lib/CaretRight.svelte';
  import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { updateProfile } from '../../settings/client';

  const userProfile = getContext('userProfile') as Writable<UserType & { tags: string[] }>;

  export let selected: string[] = [];
	export let tagsInput = '';
  export let showTagsControl = false;

  $: tags = $userProfile.tags;


	const addTag = (tag: string) => {
    if (selected.includes(tag)) return;
    selected = [...selected, tag];
		tagsInput = '';
	};

	const clickTagHandler = (tag: string) => () => {
    const idx = selected.indexOf(tag);

    if (idx > -1) selected = selected.splice(idx, 1);
    else {
      selected = [...selected, tag];
    }
	};

	const createTag = async (tag: string) => {
		if (tag.length < 3) return;
		if (tags.includes(tag)) return addTag(tag);
		await updateProfile({ tags: [...tags, tag] }).then(() => {
			userProfile.update((value) => {
				return {
					...value,
					tags: [...value.tags, tag]
				};
			});
		});
		addTag(tag);
	};

	const filterTags = (tags: string[], query: string) => {
		if (tags.length === 0) return [];
		const match = new RegExp('^' + tagsInput, 'i');
		return tags.filter((tag) => !!tag.match(match));
	};

	$: autoCompleteTags = filterTags(tags, tagsInput);

  const toggleTagsCtrl = (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		e.preventDefault();
		showTagsControl = !showTagsControl;
	};

	$: canCreateTag = tagsInput.length > 2 && autoCompleteTags.length == 0;
</script>

<div class="card p-2 pt-0 mb-2" class:overflow-hidden={!showTagsControl}>
	<span class="card-header">
		<button
			id="toggleButton"
			class="toggle-button h-8 bg-transparent border-none focus:font-semibold focus:underline text-lg focus:outline-none"
			aria-controls="extraContent"
			aria-expanded="false"
			on:click={toggleTagsCtrl}
		>
			<span
				class="caret mr-2 p-1 py-0.5 h-4 w-4 inline-block transition-all duration-300 ease-in-out"
				style:transform={showTagsControl ? 'rotate(90deg)' : 'rotate(0deg)'}
			>
				<CaretRight />
			</span>
			<span class="py-1.5 mt-0.5 inline-block"
				>Tags{#if !showTagsControl} (Click to add){/if}</span
			>
		</button>
		<ul class="flex-nowrap inline-flex">
			{#each selected as sauce}
        <li class="chip mx-1 mb-2 variant-soft-secondary">{sauce}</li>
			{/each}
		</ul>
	</span>
	<section>
		<div
			id="extraContent"
			aria-labelledby="toggleButton"
			class:max-h-0={!showTagsControl}
			class:max-h-96={showTagsControl}
			class:pb-2={showTagsControl}
			class:py-2={showTagsControl}
			class:px-2={true}
			style:overflow={showTagsControl ? 'visible' : 'hidden'}
			class="extra-content transition-all"
		>
			<input
				type="text"
				class="input mb-2"
				bind:value={tagsInput}
				on:keydown={(e) => {
					if (e.key == 'Enter') {
						e.preventDefault();
						if (tagsInput.length > 2 && autoCompleteTags.length == 0) {
							createTag(tagsInput);
						}
					}
				}}
				placeholder="Click to add or type to filter..."
			/>
			<ul class="flex">
				<li class="transition-all {canCreateTag ? '' : 'max-h-0 max-w-0 opacity-0 hidden'}">
					<button
						type="button"
						on:click={() => createTag(tagsInput)}
						class="chip variant-filled-primary mx-1 mb-2">Create "{tagsInput}"</button
					>
				</li>
				{#each autoCompleteTags as tag}
					<li>
						<button
							type="button"
							on:click={clickTagHandler(tag)}
							class="chip mx-1 mb-2 variant-soft-{selected.includes(tag) ? 'secondary' : 'primary' }">{tag}</button
						>
					</li>
				{/each}
			</ul>
			<!-- Extra content goes here -->
		</div>
	</section>
</div>
