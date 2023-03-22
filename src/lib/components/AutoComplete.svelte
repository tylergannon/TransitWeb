<script lang="ts">

  import { writable, type Readable } from 'svelte/store';
	import type { GeoNamesCityType } from '$lib/srv/model';

  import derivedAsync from '$lib/stores/asyncDerivedStore';

	import Item from './AutoCompleteItem.svelte';

	/* HANDLING THE INPUT */
	let searchInput: HTMLInputElement; // use with bind:this to focus element
	let inputValue = writable('')
	export let result: null|GeoNamesCityType = null;

  const cities = derivedAsync(inputValue, [], async ($inputValue) => {
    if ($inputValue) {
			return await fetch("/app/api/findCity/" + $inputValue).then(res => res.json()) as Array<GeoNamesCityType>;
    } else {
      return [];
    }
  });

	$: if (!inputValue) {
		selectedIdx = -1;
	}

	const getDisplayName = (result: GeoNamesCityType) => {
		const place = [result.place[0]]
		for (let i = 2; i < result.place.length; i++) {
			if (result.place[i] !== place[-1]) {
				place.push(result.place[i])
			}
		}
		return [result.name, ...place.reverse()].join(', ');
	};

	const setInputVal = (res: GeoNamesCityType) => {
		inputValue.set(getDisplayName(res));
		result = res;
		selectedIdx = -1;
    searchInput.blur()
	};

	let selectedIdx = -1;

	const navigateList = (
		e: KeyboardEvent & {
			currentTarget: EventTarget & Window;
		}
	) => {
    if ($cities.length == 0 || document.activeElement !== searchInput) return;
		if (e.key === 'ArrowDown') {
      if (selectedIdx === $cities.length-1) {
        selectedIdx = 0;
      } else {
        selectedIdx += 1
      }
		} else if (e.key === 'ArrowUp' && selectedIdx >= 0) {
      if (selectedIdx === 0) {
        selectedIdx = $cities.length - 1;
      } else {
        selectedIdx -= 1
      }
		} else if (e.key === 'Escape') {
			searchInput.blur();
		} else if (e.key === 'Enter') {
      if (selectedIdx >= 0) {
        setInputVal($cities[selectedIdx]);
      } else {
        e.preventDefault()
      }
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault>
	<div class="autocomplete">
		<input
			id="autocomplete-input"
			type="text"
			placeholder="Search Country Names"
			bind:this={searchInput}
			bind:value={$inputValue}
		/>
	</div>

	<!-- FILTERED LIST OF COUNTRIES -->
	{#if $cities && $cities.length > 0 && searchInput === document.activeElement }
		<ul id="autocomplete-items-list">
			{#each $cities as city, i}
				<Item
					itemLabel={getDisplayName(city)}
					highlighted={i === selectedIdx}
					on:click={() => setInputVal(city)}
				/>
			{/each}
		</ul>
	{/if}
</form>

<style>
	div.autocomplete {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
		width: 300px;
	}
	input {
		border: 1px solid transparent;
		background-color: #f1f1f1;
		padding: 10px;
		font-size: 16px;
		margin: 0;
	}
	input[type='text'] {
		background-color: #f1f1f1;
		width: 100%;
	}
	input[type='submit'] {
		background-color: DodgerBlue;
		color: #fff;
	}

	#autocomplete-items-list {
		position: relative;
		margin: 0;
		padding: 0;
		top: 0;
		width: 297px;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
