import { format, utcToZonedTime } from 'date-fns-tz';
import type { GateNumber } from './gateNumber';
import { trigramOrder, lines } from '$lib/ijing/trigrams';
import type { Trigram } from '$lib/ijing/trigrams';
const PUBLIC_ASTROAPI_URL = '/astroapi';

type GateRecord<T> = Record<GateNumber, T>;

export type PlanetData<T> = {
	sun: T;
	moon: T;
	earth: T;
	mercury: T;
	venus: T;
	mars: T;
	jupiter: T;
	saturn: T;
	uranus: T;
	neptune: T;
	pluto: T;
	northNode: T;
	southNode: T;
	chiron?: T;
};

export const planetNames = [
	'sun',
	'earth',
	'northNode',
	'southNode',
	'moon',
	'mercury',
	'venus',
	'mars',
	'jupiter',
	'saturn',
	'uranus',
	'neptune',
	'pluto',
	'chiron'
] as const;

export type PlanetName = (typeof planetNames)[number];
export type PlanetRecord<T> = Record<PlanetName, T>;

export type PlanetDataJson<T> = {
	sun: T;
	moon: T;
	mars: T;
	mercury: T;
	venus: T;
	jupiter: T;
	saturn: T;
	uranus: T;
	neptune: T;
	pluto: T;
	north_node: T;
	chiron?: T;
};

export type LineNumber = '1' | '2' | '3' | '4' | '5' | '6';
export type LatitudeDeg = number;
export type LongitudeDeg = number;
export type DistAu = number;
export type PositionJson = [
	number,
	number,
	LatitudeDeg,
	LongitudeDeg,
	DistAu,
	number,
	number,
	number
];

export interface Position {
	gate: GateNumber;
	line: LineNumber;
	lng: LongitudeDeg;
}

type ChartJson = PlanetDataJson<PositionJson> & { chart_date: ChartDateJson };

export type Chart = PlanetData<Position> & { chartDateJson: ChartDateJson };

const position = (p: PositionJson): Position => ({
	gate: p[0].toString() as GateNumber,
	line: p[1].toString() as LineNumber,
	lng: p[3]
});

const chart = ({ north_node, chart_date, ...c }: ChartJson): Chart => {
	return {
		chartDateJson: chart_date,
		sun: position(c.sun),
		earth: revGate(c.sun[3]),
		moon: position(c.moon),
		mercury: position(c.mercury),
		venus: position(c.venus),
		mars: position(c.mars),
		jupiter: position(c.jupiter),
		saturn: position(c.saturn),
		uranus: position(c.uranus),
		neptune: position(c.neptune),
		pluto: position(c.pluto),
		northNode: position(north_node),
		southNode: revGate(north_node[3]),
		chiron: c.chiron && position(c.chiron)
	};
};

export interface HdChart {
	natal: Chart;
	design: Chart;
}

export type ChartDateJson = {
	date: string;
	time: string;
	tz: string;
};

export type TransitionReportJson = {
	start_date: ChartDateJson;
	end_date: ChartDateJson;
	chart: ChartJson;
	transitions: [keyof PlanetData<any>, ChartJson][];
	strict?: boolean;
	lines?: string[];
};
const GATE_SIZE = 5.625;
const LINE_SIZE = GATE_SIZE / 6;

const _fmt = (d: Date, t: string, p: string) => format(utcToZonedTime(d, t), p, { timeZone: t });
const fDate = (d: Date, t: string) => _fmt(d, t, 'yyyy-MM-dd');
const fTime = (d: Date, t: string) => _fmt(d, t, 'HH:mm:ss');

const gateAndLine = (lng: LongitudeDeg): Position => {
	const norm = (lng + 58.0) % 360;
	return {
		gate: gatesOrder[Math.round(norm / GATE_SIZE - 0.5)].toString() as GateNumber,
		line: Math.round((norm % GATE_SIZE) / LINE_SIZE + 0.5).toString() as LineNumber,
		lng
	};
};

const revGate = (lng: LongitudeDeg) => gateAndLine((lng + 180) % 360);

export async function fetchChart(
	dobUtc: Date,
	timeZone: string,
	_fetch: typeof fetch
): Promise<HdChart> {
	const res = await _fetch(
		PUBLIC_ASTROAPI_URL +
			'/chart?' +
			new URLSearchParams({
				local_time: fTime(dobUtc, timeZone),
				tz: timeZone,
				local_date: fDate(dobUtc, timeZone)
			}).toString()
	);
	const json = await res.json();
	return { natal: chart(json.natal), design: chart(json.design) };
}

export function transitionReportRequest(
	utcStart: Date,
	utcEnd: Date,
	timeZone: string,
	_fetch: typeof fetch
) {
	return _fetch(
		PUBLIC_ASTROAPI_URL +
			'/transition_report?' +
			new URLSearchParams({
				start_date: fDate(utcStart, timeZone),
				start_time: fTime(utcStart, timeZone),
				end_date: fDate(utcEnd, timeZone),
				end_time: fTime(utcEnd, timeZone),
				tz: timeZone
			}).toString()
	).then((res) => res.json()) as Promise<TransitionReportJson>;
}

const gatesOrder = [
	'41',
	'19',
	'13',
	'49',
	'30',
	'55',
	'37',
	'63',
	'22',
	'36',
	'25',
	'17',
	'21',
	'51',
	'42',
	'3',
	'27',
	'24',
	'2',
	'23',
	'8',
	'20',
	'16',
	'35',
	'45',
	'12',
	'15',
	'52',
	'39',
	'53',
	'62',
	'56',
	'31',
	'33',
	'7',
	'4',
	'29',
	'59',
	'40',
	'64',
	'47',
	'6',
	'46',
	'18',
	'48',
	'57',
	'32',
	'50',
	'28',
	'44',
	'1',
	'43',
	'14',
	'34',
	'9',
	'5',
	'26',
	'11',
	'10',
	'58',
	'38',
	'54',
	'61',
	'60'
] as readonly GateNumber[];

const hexagram0 = 0x4dbf;

export const hexagram = (gate: GateNumber) => `&#x${(hexagram0 + parseInt(gate)).toString(16)}`;

const HexOrder = Object.fromEntries(
	[
		['1', '11', '5', '14', '34', '26', '9', '43'],
		['12', '2', '8', '35', '16', '23', '20', '45'],
		['6', '7', '29', '64', '40', '4', '59', '47'],
		['13', '36', '63', '30', '55', '22', '37', '49'],
		['25', '24', '3', '21', '51', '27', '42', '17'],
		['33', '15', '39', '56', '62', '52', '53', '31'],
		['44', '46', '48', '50', '32', '18', '57', '28'],
		['10', '19', '60', '38', '54', '41', '61', '58']
	].flatMap((row, idx) => row.map((gate, jdx) => [gate, [trigramOrder[idx], trigramOrder[jdx]]]))
) as GateRecord<[Trigram, Trigram]>;

export const gateLines = (gate: GateNumber) => {
	return HexOrder[gate].flatMap((t) => lines(t)) as [
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
		boolean
	];
};
