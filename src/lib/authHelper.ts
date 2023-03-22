import { required, minLength, maxLength, email, pattern } from 'svelte-use-form';

export const PASSWORD_HINTS = {
	required: 'Please supply a strong password.',
	minLength: 'At least 8 characters.',
	maxLength: 'Not more than 40 characters.',
	pattern: 'At least one upper, one lower, one number.'
};

export const PASSWORD_VALIDATORS = [
	required,
	minLength(8),
	maxLength(40),
	pattern('[a-z]'),
	pattern('[A-Z]'),
	pattern('[0-9\\.\\?\\!]')
];
