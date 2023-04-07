declare module '*.md' {
	const data: { [key: string]: any };
	// Modify below per your usage
	export { data };
}

declare module '$lib/content/channels/*.md' {
	const data: {
		name: string;
		display: string;
		gate1: import('$lib/hd/gateNumber').GateNumber;
		gate2: import('$lib/hd/gateNumber').GateNumber;
		center1: import('$lib/hd/graph').CenterName;
		center2: import('$lib/hd/graph').CenterName;
		circuit: string;
	};

	export { data };
}

declare module '$lib/content/gates/*.md' {
	const data: {
		gate: import('$lib/hd/gateNumber').GateNumber;
		name: string;
		hexagram: string;
		title: string;
		center: import('$lib/hd/graph').CenterName;
		paired: import('$lib/hd/gateNumber').GateNumber[];
		channel: string[];
		circuit?: string;
		slogan?: string;
		lines: {
			[key: import('$lib/hd/chart').LineNumber]: {
				line: string;
				exalted: { planet: string; text: string };
				diminished: { planet: string; text: string };
			};
		};
	};
	export { data };
}

declare module '$lib/content/profiles/*.md' {
	const data: {
		name: string;
		display: string;
		title: string;
	};
	export { data };
}

declare module '$lib/content/planets/*.md' {
	const data: {
		name: string;
		display: string;
		title: string;
	};
	export { data };
}

declare module '$lib/content/types/*.md' {
	const data: {
		name: string;
		display: string;
		strategy: string;
		theme: string;
	};
	export { data };
}
