import { writable, type Readable } from 'svelte/store';

export default function derivedStore<T, U = string>(
	from: Readable<U>,
	initial: T,
	query: (id: U) => Promise<T>,
	debounce = 100
): Readable<T> & { busy: Readable<boolean> } {
	const { subscribe, set } = writable<T>(initial);
	let timeout: ReturnType<typeof setTimeout> | null = null;
	const busy = writable(false);
	from.subscribe((input) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		busy.set(true);
		timeout = setTimeout(() => {
			timeout = null;
			query(input).then((data) => {
				set(data);
				busy.set(false);
			});
		}, debounce);
	});
	return {
		subscribe,
		busy: { subscribe: busy.subscribe }
	};
}
