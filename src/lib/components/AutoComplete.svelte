<script lang="ts">
	import searchCities from '$lib/db/citySearch';
  import { writable, type Readable } from 'svelte/store';
	import type { CitySearchResult } from '$lib/db/citySearch';
  import derivedAsync from '$lib/stores/asyncDerivedStore';

	import Item from './AutoCompleteItem.svelte';

	/* HANDLING THE INPUT */
	let searchInput: HTMLInputElement; // use with bind:this to focus element
	let inputValue = writable('')
	const { set: setCity, subscribe: subscribeCity } = writable<CitySearchResult>();
	export const selectedCity: Readable<CitySearchResult> = {subscribe: subscribeCity}

  const cities = derivedAsync(inputValue, [], async ($inputValue) => {
    if ($inputValue) {
      return searchCities($inputValue).then(cities => cities.map(city => {
        city.display = makeMatchBold(city.display);
        return city
      }));
    } else {
      return [];
    }
  });

	$: if (!inputValue) {
		selectedIdx = -1;
	}

	const clearInput = () => {
		inputValue.set('')
		searchInput.focus();
	};

	const setInputVal = (result: CitySearchResult) => {
		inputValue.set(removeBold(result.display));
		setCity(result);
		selectedIdx = -1;
    searchInput.blur()
	};

	const makeMatchBold = (str: string) => {
		// replace part of (country name === inputValue) with strong tags
		let matched = str.substring(0, $inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str: string) => {
		//replace < and > all characters between
		return str.replace(/<(.)*?>/g, '');
		// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
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
		} else if (e.key === 'Enter') {
      if (selectedIdx >= 0) {
        setInputVal($cities[selectedIdx]);
      } else {
        e.preventDefault()
      }
		}
	};
</script>

<svelte:window on:keydown={(e) => {return}} />

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
					itemLabel={city.display}
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
