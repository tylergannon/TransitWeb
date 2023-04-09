import { enhance } from '$app/forms';
import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { Entries } from 'type-fest';

const DEFAULT_DEBOUNCE_MS = 300;

export const regularDebounce = <T>(func: (args: T) => Promise<void>, wait = 200) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (args: T) => {
		const later = () => {
			timeout = null;
			func(args);
		};
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export const entries = <T>(obj: T) => Object.entries(obj as any) as Entries<T>;

export default regularDebounce;

export function debounce<T>(
	func: (args: T) => void,
	wait: number = DEFAULT_DEBOUNCE_MS
): ((args: T) => void) & Readable<boolean> {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	const { set, subscribe } = writable(false);

	const newFunc = (args: T) => {
		set(true);
		const later = () => {
			timeout = null;
			func(args);
			set(false);
		};

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
	newFunc.subscribe = subscribe;
	return newFunc;
}
/**
 * Handles to update or destroy an action / component extension.
 */
export type ActionCallbacks<T = void> = {
	destroy: () => void;
	update?: (val: T) => void;
};

export type NodeAction<NodeT extends HTMLElement = HTMLFormElement, UpdateT = any> = (
	node: NodeT
) => ActionCallbacks<UpdateT>;

export const enhanceForm = (form: HTMLFormElement, action: NodeAction) => {
	const destroy = [action(form).destroy, enhance(form).destroy];
	return { destroy: () => destroy.map((a) => a()) };
};
