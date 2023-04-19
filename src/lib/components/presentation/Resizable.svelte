<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Sides, type DraggableEvents, type ResizableSide, type Resizing } from './helper';
	import type { Click, MouseEventListener } from '../events';
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
	export let autoHide = false;
	export let visible = true;
	let container: HTMLDivElement;

  type Handler = MouseEventListener<HTMLDivElement>
	/**
	 * Resets visible, calling dispatch as needed.  Returns the new size.
	 * @param calc The distance from the cursor to the edge of the container
	 * @param min The minimum size of the container
	 */
	function setSizeProp(calc: number, min: number) {
		const actual = calc >= min ? calc : autoHide ? 0 : min;
		if (actual === 0 && visible) {
			visible = false; dispatch('visible', false);
		} else if (actual > 0 && !visible) {
			visible = true; dispatch('visible', true);
		}
		return `${actual}px`;
	}

	const events: {mousemove: Handler, mouseup: Handler} = {
		mousemove: (e: MouseEvent) => {
			if (!resizing) return;
			const { clientX, clientY } = e;
			const { x, y } = container.getBoundingClientRect();
			if (resizing.includes('right')) {
				width = setSizeProp(clientX - x, minWidth);
			}
			if (resizing.includes('bottom')) {
				height = setSizeProp(clientY - y, minHeight);
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
	style:visibility={visible ? 'visible' : 'hidden'}
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
		opacity: 0.2;
		z-index: 1;
		transition: opacity 0.2s ease;
		&:hover {
			opacity: 0.4;
		}
		&.right {
			width: 7px;
			height: 100%;
			top: 0;
			right: 0;
			cursor: col-resize;
		}
		&.bottom {
			width: 100%;
			height: 7px;
			bottom: 0;
			left: 0;
			cursor: row-resize;
		}
		&.bottom-right {
			width: 5px;
			height: 5px;
			bottom: 0;
			right: 0;
			cursor: se-resize;
		}
	}
</style>
