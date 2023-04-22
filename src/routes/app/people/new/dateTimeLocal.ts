import { writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { zonedTimeToUtc } from 'date-fns-tz';
import { formatDatetimeLocal } from './helper';

type ActionRes = { update: (newTz?: string) => void; destroy: () => void };
type DtAction = (input: HTMLInputElement, tz?: string) => ActionRes;
export type ActionStore = Readable<Date | null> & DtAction;

const BAD_YEAR = 'Choose year from 1550 to 2649.';
const yearValidator = (year?: number) => (!year || (year >= 1550 && year <= 2649) ? '' : BAD_YEAR);

export function dtLocalWithTz(initial?: Date): ActionStore {
	const { set, subscribe }: Writable<Date | null> = writable(initial ?? null);

	function action(input: HTMLInputElement, tz?: string) {
		if (initial && tz) {
			input.value = formatDatetimeLocal({ tz, dobUtc: initial });
		}

		function onChange() {
			if (!tz) return;
			console.log(input);
			console.log(input.validity);
			try {
				const val = zonedTimeToUtc(input.value, tz);
				input.setCustomValidity(yearValidator(val.getFullYear()));
				input.reportValidity();
				set(val);
			} catch (err) {
				set(null);
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
	action.subscribe = subscribe;
	return action as typeof action & Readable<Date | null>;
}
