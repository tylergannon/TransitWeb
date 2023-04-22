<script lang="ts">
	import type { GeoNamesCityType } from '$lib/srv/model';

	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import AutoCompleteItem from '$lib/components/complete/AutoCompleteItem.svelte';
	import { writable } from 'svelte/store';
	import { citiesStore } from './helper';
	import type { Evt } from '$lib/components/events';
	import { createEventDispatcher } from 'svelte';
	export let selectedCity: GeoNamesCityType | null = null;

  const dispatch = createEventDispatcher<{
    focusout: void, 
    selectCity: GeoNamesCityType,
    clear: void,
  }>()

	let cityQuery = writable('');
	const cities = citiesStore(cityQuery);

	function selectCity (city: GeoNamesCityType) {
		selectedCity = city;
    $cityQuery = ''
    dispatch("selectCity", city);
	};

  function clear() {
    selectedCity = null;
    dispatch("clear");
  }

  function focusOut (e: Evt<FocusEvent>) {
    dispatch("focusout");
    $cityQuery = '';
  }

</script>

<div on:focusout={focusOut}>
  <label class="label mt-1.5">
    {#if selectedCity}
      <span class="prose">Place of Birth</span>
    {:else}
      <span class="prose">Where were they born?</span>
    {/if}
    {#if selectedCity}
      <div class="flex flex-row">
        <div
          class="hover:cursor-pointer chip variant-soft-secondary relative"
          on:click={clear}
          on:keydown={clear}
        >
          <div class="absolute top-2 right-2">
            <TrashCan />
          </div>
          <div class="flex flex-col items-start">
            <div class="text-lg">{selectedCity.name}</div>
            <span class="text-sm"
              >{selectedCity.place[0]}, {selectedCity.place[2]}, {selectedCity.place[3]}</span
            >
          </div>
        </div>
      </div>
    {/if}
    <input
      class="input"
      disabled={!!selectedCity}
      required={!selectedCity}
      style:display={selectedCity ? 'none' : 'block'}
      bind:value={$cityQuery}
      type="search"
      placeholder="Start typing a city name..."
      form=""
    />
  </label>
  <div class="autocomplete">
    <nav class="autocomplete-nav">
      <ul class="autocomplete-list list-nav">
        {#if !selectedCity}
          {#each $cities as city, i}
            <AutoCompleteItem
              classesItem="autocomplete-item"
              classesButton="autocomplete-button"
              on:click={() => selectCity(city)}
              on:keypress={() => selectCity(city)}
            >
              <div class="flex flex-col items-start">
                <span class="text-lg">{city.name}</span>
                <span class="text-sm">{city.place[0]}, {city.place[2]}, {city.place[3]}</span>
              </div>
            </AutoCompleteItem>
          {/each}
        {/if}
      </ul>
    </nav>
  </div>
</div>
