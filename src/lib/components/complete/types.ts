// Autocomplete Types

export interface AutoCompleteOption<T = unknown> {
	/** provide a unique display label per option. Supports HTML. */
	label: string;
	/** Provide a unique option value. */
	value: T;
	/** Provide a comma seperated list of keywords. */
	keywords?: [string];
	/** Pass arbitrary data per option. */
	meta?: any;
}

export interface AutoCompleteProvider {
	(query: string): Promise<AutoCompleteOption[]> | AutoCompleteOption[];
}
