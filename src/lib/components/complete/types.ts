// Autocomplete Types

export interface AutoCompleteOption<T = string, U = any> {
	/** provide a unique display label per option. Supports HTML. */
	label: string;
	/** Provide a unique option value. */
	value: T;
	/** Pass arbitrary data per option. */
	extra?: U;
}

export interface AutoCompleteProvider<T = string, U = any> {
	(query: string): Promise<AutoCompleteOption<T, U>[]> | AutoCompleteOption<T, U>[];
}
