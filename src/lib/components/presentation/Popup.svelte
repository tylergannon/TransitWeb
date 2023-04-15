<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		computePosition,
		autoUpdate,
		flip as _flip,
		shift as _shift,
		offset as _offset,
		arrow as _arrow,
		type Placement
	} from '@floating-ui/dom';
	import type {} from '@floating-ui/dom';
	import { OP_SIDES, type Direction } from './types';

	export let offset: null | number | { mainAxis: number; crossAxis?: number } = null;
	export let arrow: false | number = 0;
	export let shift: Parameters<typeof _shift>[0] = undefined;
	export let flip: Parameters<typeof _flip>[0] = {};
	export let placement: Placement = 'bottom';

	let arrowElem: HTMLElement;
	type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
	let computedPosition: UnwrapPromise<ReturnType<typeof computePosition>> | null = null;
	let staticSide: Direction = OP_SIDES[placement.split('-')[0] as Direction];

	const dispatch = createEventDispatcher<{ openPopup: void; closePopup: void }>();

	$: {
		if (target && popup) {
			computePosition(target, popup, {
				placement,
				middleware: [
					offset ? _offset(offset) : null,
					_shift(shift),
					_flip(flip),
					arrow === false ? null : _arrow({ element: arrowElem, padding: arrow })
				].filter(Boolean)
			}).then((position) => {
				computedPosition = position;
				if (position.middlewareData.arrow) {
					arrowData = position.middlewareData.arrow;
				}
				staticSide = OP_SIDES[position.placement.split('-')[0] as Direction];
			});
		}
	}
	export let tagName: 'div' | 'span' = 'div';

	let target: HTMLElement;
	let popup: HTMLElement;
	let arrowData: { x?: number; y?: number; centerOffset: number } = { centerOffset: 0 };
	let visible: boolean = false;
	const destroyFns: (() => void)[] = [];

	$: {
		if (visible) {
			destroyFns.push(
				autoUpdate(target, popup, () => {
					target = target;
				})
			);
		} else {
			while (destroyFns.length) {
				destroyFns.pop()?.();
			}
		}
	}

	type _TransitionEvent = TransitionEvent & { currentTarget: EventTarget & typeof popup };
	const transitionEnd = ({ currentTarget }: _TransitionEvent) => {
		const opacity = parseFloat(getComputedStyle(currentTarget).opacity);
		visible = opacity === 1;
		dispatch(opacity === 1 ? 'openPopup' : 'closePopup');
	};

	const transitionStart = (e: _TransitionEvent) => {};
	const transitionCancel = (e: _TransitionEvent) => {};
</script>

<svelte:element this={tagName} bind:this={target} class="wrap">
	<slot />

	<aside
		bind:this={popup}
		class="popup"
		style:top="{computedPosition?.y}px"
		style:left="{computedPosition?.x}px"
		on:transitionend={transitionEnd}
		on:transitionstart={transitionStart}
		on:transitioncancel={transitionCancel}
	>
		<slot name="popup" />
		{#if arrow !== false}
			<div
				style:top={'top' === staticSide ? `-4px` : arrowData.y ? `${arrowData.y}px` : `auto`}
				style:left={'left' === staticSide ? `-4px` : arrowData.x ? `${arrowData.x}px` : `auto`}
				style:right={'right' === staticSide ? `-4px` : `auto`}
				style:bottom={'bottom' === staticSide ? `-4px` : `auto`}
				class="arrow"
				bind:this={arrowElem}
			/>
		{/if}
	</aside>
</svelte:element>

<style lang="postcss">
	.wrap {
		position: relative;
		.popup {
			position: absolute;
			z-index: 1000;
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition-property: opacity, visibility;
			transition-delay: 0.5s, 0.5s;
			transition-duration: 1.1s, 0.01s;
			transition-timing-function: ease-in-out, ease-in-out;
		}
		&:hover .popup, .popup:hover {
			opacity: 1;
			visibility: visible;
			pointer-events: initial;
			transition-delay: 0s, 0.5s;
		}
	}
</style>
