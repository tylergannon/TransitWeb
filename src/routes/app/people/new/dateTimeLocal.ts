import { zonedTimeToUtc } from 'date-fns-tz';
import { createEventDispatcher } from 'svelte';

export function dtLocalWithTz(input: HTMLInputElement, tz?: string) {
	const dispatch = createEventDispatcher<{
		setDate: { utc: Date; tz: string };
	}>();
	function onChange() {
		if (!tz) return;
		console.log(input);
		console.log(input.validity);
		try {
			const utc = zonedTimeToUtc(input.value, tz);
			dispatch('setDate', { utc, tz });
		} catch (err) {
			console.debug(`Couldn't parse date`, err);
		}
	}
	input.addEventListener('change', onChange);
	return {
		update: function (newTz?: string) {
			if (newTz) {
				tz = newTz;
				onChange();
			}
		},
		destroy: function () {
			input.removeEventListener('change', onChange);
		}
	};
}
