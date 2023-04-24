<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { writable } from "svelte/store";


  let input: HTMLInputElement;

  export let {set: setMessage, ...message} = writable("");
  export let validateOn: keyof HTMLElementEventMap = "input";
  export let custom: (val: string) => string|"" = ()=>"";

  const destructors: (()=>void)[] = [];

  function unmount() {
    while (destructors) destructors.pop()?.();
  }

  const action = (node: HTMLInputElement) => { input = node; };

  function onEvent() {
    input.setCustomValidity(custom(input.value));
    input.checkValidity();
    setMessage(input.validationMessage);
  }

  function mount() {
    const theEvent = validateOn;
    input.addEventListener(theEvent, onEvent)
    destructors.push(()=>input.removeEventListener(theEvent, onEvent));
  }
  onMount(mount);
  onDestroy(unmount);
</script>

<slot {action} valid={!!$message} validationMessage={$message} />

