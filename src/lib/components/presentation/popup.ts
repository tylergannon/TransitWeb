/**
 * @fileoverview
 * ```
 * <div>
 *   {@const popup = new Popup()}
 *   <a href="#" use:popup.target >Some link</a>
 *   <div use:popup.floating={show}>
 * </div>
 * ```
 */
import {
	flip as _flip,
	shift as _shift,
	offset as _offset,
	arrow as _arrow,
	computePosition,
	autoUpdate
} from '@floating-ui/dom';

import type * as dom from '@floating-ui/dom';

import { OP_SIDES, type Direction } from './types';

export type PopupArgs = {
	visible: boolean;
	offset: number | { mainAxis: number; crossAxis?: number };
	arrow: false | number;
	shift: NonNullable<Parameters<typeof _shift>[0]>;
	flip: NonNullable<Parameters<typeof _flip>[0]>;
	placement: dom.Placement;
	className: string;
	dismiss: boolean;
};

const addArrow = (el: HTMLElement): HTMLElement => {
	const arrowEl = el.appendChild(document.createElement('div'));
	arrowEl.className = 'arrow';
	return arrowEl;
};

/**
 * Sets the style of an HTML element.
 */
const setStyle = <T extends HTMLElement>(el: T, style: Partial<CSSStyleDeclaration>) => {
	Object.assign(el.style, style);
};

const POPUP_ERROR = 'Tried to popup when targetEl or floatingEl is not set.';
export class Popup<T extends HTMLElement = HTMLElement, U extends HTMLElement = HTMLElement>
	implements PopupArgs
{
	dismiss = false;
	_visible = false;
	offset: number | { mainAxis: number; crossAxis?: number | undefined } = 0;
	arrow: number | false = 0;
	shift: Partial<
		dom.ShiftOptions & {
			rootBoundary: dom.RootBoundary;
			elementContext: dom.ElementContext;
			altBoundary: boolean;
			padding: dom.Padding;
			boundary: dom.Boundary;
		}
	> = {};
	flip: Partial<
		dom.FlipOptions & {
			rootBoundary: dom.RootBoundary;
			elementContext: dom.ElementContext;
			altBoundary: boolean;
			padding: dom.Padding;
			boundary: dom.Boundary;
		}
	> = {};
	placement: dom.Placement = 'bottom';
	className = 'show';
	private connectDismiss() {
		document.addEventListener('keyup', this.onKeyup);
		document.addEventListener('click', this.onOutsideClick);
	}
	private disconnectDismiss() {
		document.removeEventListener('keyup', this.onKeyup);
		document.removeEventListener('click', this.onOutsideClick);
	}
	private onKeyup = (e: KeyboardEvent) => {
		if (e.key === 'Escape') this.hide();
	};
	private onOutsideClick = (e: MouseEvent) => {
		if (
			!this.floatingEl?.contains(e.target as Node) &&
			!this.targetEl?.contains(e.target as Node)
		) {
			this.hide();
			console.log(e);
			console.log('I hid the popup');
		}
	};
	/**
	 * List of functions to call when destroying (obtained from autoUpdate).
	 */
	private readonly destroyFns: (() => any)[] = [];
	/**
	 * The element that triggers the popup.
	 */
	private targetEl?: T = undefined;
	/**
	 * The element that is shown when the popup is triggered.
	 */
	private floatingEl?: U = undefined;
	/**
	 * If waiting to show or hide, the timeout.
	 */
	private timeout?: ReturnType<typeof setTimeout> = undefined;
	/**
	 * If waiting to show or hide, cancel.
	 */
	private cancelTransition() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = undefined;
		}
	}

	public show = () => {
		this.visible = true;
	};

	public hide = () => {
		this.visible = false;
	};

	public toggle = () => {
		this.visible = !this.visible;
	};

	/**
	 * The public interface to show and hide the popup.
	 * Calls out to _show and _hide to do the actual DOM manipulation.
	 */
	set visible(v: boolean) {
		if (v === this._visible) return;
		this._visible = v;
		if (v) this._show();
		else this._hide();
	}

	get visible() {
		return this._visible;
	}

	/**
	 * Apply as an action to the target element.
	 * ```
	 * <a href="#" use:popup.target >Some link</a>
	 * ```
	 * @param el Target element.
	 */
	public target = (el: T, args: Partial<PopupArgs> = {}) => {
		this.targetEl = el;

		return {
			destroy: () => {
				this.targetEl = undefined;
			}
		};
	};

	/**
	 * Action to pass to the floating element.
	 * ```
	 * <div use:popup.floating={show}>
	 * ```
	 */
	public floating = (el: U, args: Partial<PopupArgs> = {}) => {
		this.floatingEl = el;
		Object.assign(this, args);
		return {
			destroy: this.stopObserving
		};
	};

	/**
	 * Remove autoupdate listeners.
	 */
	private stopObserving = () => {
		while (this.destroyFns.length) {
			this.destroyFns.pop()?.();
		}
	};

	/**
	 * Add autoupdate listeners.
	 */
	private observe() {
		this.destroyFns.push(autoUpdate(this.targetEl as T, this.floatingEl as U, this.render));
	}

	constructor(args: Partial<PopupArgs> = {}) {
		Object.assign(this, args);
	}

	/**
	 * @returns The middleware to pass to Floating UI.
	 */
	private middleware(): NonNullable<Parameters<typeof computePosition>[2]>['middleware'] {
		const { offset, arrow, shift, flip } = this;
		return [
			offset ? _offset(offset) : null,
			_shift(shift),
			_flip(flip),
			arrow === false ? null : _arrow({ element: this.arrowEl, padding: arrow })
		].filter(Boolean);
	}

	/**
	 * - Render the popup.
	 * - Observe for positional changes.
	 * - Add the show class.
	 * - Listen for dismiss events if dismiss is true.
	 */
	private _show() {
		this.render();
		this.observe();
		this.floatingEl?.classList.add(this.className);
		if (this.dismiss) this.connectDismiss();
	}

	/**
	 * - Stop observing for positional changes.
	 * - Remove the show class.
	 * - Disconnect dismiss events if dismiss is true.
	 */
	private _hide() {
		this.stopObserving();
		this.floatingEl?.classList.remove(this.className);
		if (this.dismiss) this.disconnectDismiss();
	}

	/**
	 * - Validate that both elements are set
	 * - Compute the position of the floating element
	 * - Set the position of the floating element
	 * - If there is an arrow, set its position
	 */
	private render = async () => {
		const { floatingEl, targetEl } = this;
		if (!floatingEl || !targetEl) throw new Error(POPUP_ERROR);
		const { x, y, placement, middlewareData } = await computePosition(targetEl, floatingEl, {
			placement: this.placement,
			middleware: this.middleware()
		});

		setStyle(floatingEl, { top: `${y}px`, left: `${x}px` });

		if (middlewareData.arrow) {
			this.setArrowProps(Popup.staticSide(placement), middlewareData.arrow);
		}
	};

	private setArrowProps(staticSide: Direction, { x, y }: { x?: number; y?: number }) {
		setStyle(this.arrowEl, {
			top: y ? `${y}px` : '',
			left: x ? `${x}px` : '',
			bottom: '',
			right: '',
			[staticSide]: '-4px'
		});
	}

	private static staticSide(placement: dom.Placement): Direction {
		return OP_SIDES[placement.split('-')[0] as Direction];
	}

	private get arrowEl(): HTMLElement {
		const floatingEl = this.floatingEl;
		if (!floatingEl) throw new Error("Can't get el if targetEl is not set.");
		return floatingEl.querySelector('.arrow') ?? addArrow(floatingEl);
	}
}
