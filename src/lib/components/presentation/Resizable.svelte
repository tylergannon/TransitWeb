<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Sides, type DraggableEvents, type ResizableSide, type Resizing } from './helper';
	import type { Click, ClickHandler, MouseEventListener } from '../events';
	import { entries } from '../helper';

	export let allow: ResizableSide[] = ['right'];
	const dispatch = createEventDispatcher<DraggableEvents>();
	let resizing: Resizing | null = null;

	export let minWidth = 0;
	export let minHeight = 0;
	export let clientHeight = 0;
	export let clientWidth = 0;
	export let offsetHeight = 0;
	export let offsetWidth = 0;
	export let width = 'auto';
	export let height = 'auto';
	let container: HTMLDivElement;

	$: console.log(
		`offsetHeight: ${offsetHeight}, offsetWidth: ${offsetWidth}, clientHeight: ${clientHeight}, clientWidth: ${clientWidth}`
	);

  type Handler = MouseEventListener<HTMLDivElement>

	const events: {mousemove: Handler, mouseup: Handler} = {
		mousemove: (e: MouseEvent) => {
			if (!resizing) return;
			const { clientX, clientY } = e;
			const { x, y } = container.getBoundingClientRect();
			if (resizing.includes('right')) {
				width = `${Math.max(clientX - x, minWidth)}px`;
			}
			if (resizing.includes('bottom')) {
				height = `${Math.max(clientY - y, minHeight)}px`;
			}
			dispatch('resize', { clientHeight, clientWidth });
		},
		mouseup: () => {
			if (!resizing) return;
			dispatch('stop');
			resizing = null;
      entries(events).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
		}
	};

	const mouseDown = (side: Resizing, e: Click<HTMLDivElement>) => {
		e.preventDefault();
		resizing = side;
		if (!dispatch('start', resizing)) return;
    entries(events).forEach(([event, handler]) => {
      window.addEventListener(event, handler);
    });
	};
</script>

<div
	bind:offsetHeight
	bind:offsetWidth
	bind:clientHeight
	bind:clientWidth
	bind:this={container}
	style:position="relative"
	style:width
	style:height
>
	<slot />
	{#if allow.includes('right')}
		<div class="resizer right" on:mousedown={(e) => mouseDown('right', e)} />
	{/if}
	{#if allow.includes('bottom')}
		<div class="resizer bottom" on:mousedown={(e) => mouseDown('bottom', e)} />
	{/if}
	{#if Sides.every((s) => allow.includes(s))}
		<div class="resizer bottom-right" on:mousedown={(e) => mouseDown('bottom-right', e)} />
	{/if}
</div>

<style lang="postcss">
	.resizer {
		position: absolute;
		background: #000;
		opacity: 0.2;
		z-index: 1;
		transition: opacity 0.2s ease;
		&:hover {
			opacity: 0.4;
		}
		&.right {
			width: 10px;
			height: 100%;
			top: 0;
			right: 0;
			cursor: col-resize;
		}
		&.bottom {
			width: 100%;
			height: 10px;
			bottom: 0;
			left: 0;
			cursor: row-resize;
		}
		&.bottom-right {
			width: 10px;
			height: 10px;
			bottom: 0;
			right: 0;
			cursor: se-resize;
		}
	}
</style>
