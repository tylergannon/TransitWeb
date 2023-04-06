type TrigramCode = number;

const trigrams = {
	kun: 0 as TrigramCode,
	zhen: 1 as TrigramCode,
	kan: 2 as TrigramCode,
	dui: 3 as TrigramCode,
	gen: 4 as TrigramCode,
	luo: 5 as TrigramCode,
	xun: 6 as TrigramCode,
	qian: 7 as TrigramCode
};

const _lines = (code: TrigramCode): [boolean, boolean, boolean] => [
	!!(code & 1),
	!!(code & 2),
	!!(code & 4)
];
export const lines = (trigram: Trigram): [boolean, boolean, boolean] => _lines(trigrams[trigram]);

export const trigramOrder = ['qian', 'kun', 'kan', 'luo', 'zhen', 'gen', 'xun', 'dui'];

export type Trigram = keyof typeof trigrams;
