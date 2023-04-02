import type { AutoCompleteOption, AutoCompleteProvider } from './types';

export const provider = <T = string>(
	options: AutoCompleteOption<T>[],
	whitelist: T[] = [],
	blacklist: T[] = []
): AutoCompleteProvider => {
	const _options = options.filter((option) => {
		const { value } = option;
		const whitelistMatch = whitelist.length === 0 || whitelist.some((w) => w === value);
		const blacklistMatch = blacklist.length === 0 || !blacklist.some((b) => b === value);
		return whitelistMatch && blacklistMatch;
	});
	return (query: string): AutoCompleteOption<T>[] =>
		_options.filter((option) => {
			const { label, keywords } = option;
			const queryMatch = label.toLowerCase().includes(query.toLowerCase());
			const keywordsMatch = keywords
				? keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))
				: false;
			return queryMatch || keywordsMatch;
		});
};
