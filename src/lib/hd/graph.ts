import { derived, type Readable } from 'svelte/store';
import type { GateNumber } from './stores';
import type { Point } from '$lib/svg/types';

export interface TriangleCenterProps {
	size: number;
	height: number;
	halfHeight: number;
}

export interface BodyGraphProps {
	aspectRatio: number;
	width: number;
	pipRadius: number;
	channelSpace: number;
	distFromEdge: number;
	scale: number;
	triangleSize: number;
	squareSize: number;
}

export interface CenterDisplayProps {
	x: number;
	y: number;
	size: number;
	pipRadius: number;
	centerDx: number;
	channelSpace: number;
	distFromEdge: number;
	scale: number;
	height: number;
}

export interface PipProps {
	gate: GateNumber;
	x: number;
	y: number;
	radius: number;
}

export interface CenterArgs {
	x: number;
	y: number;
	scale: number;
	size?: number;
}
export type CenterName =
	| 'head'
	| 'ajna'
	| 'throat'
	| 'g'
	| 'sacral'
	| 'root'
	| 'will'
	| 'spleen'
	| 'esp';
export type CenterRecord<T> = Record<CenterName, T>;

export function mapCenterRecord<T, U>(
	fn: ({ center, name }: { center: T; name: string }) => U,
	record: CenterRecord<T>
): CenterRecord<U> {
	return {
		head: fn({ center: record.head, name: 'head' }),
		ajna: fn({ center: record.ajna, name: 'ajna' }),
		throat: fn({ center: record.throat, name: 'throat' }),
		g: fn({ center: record.g, name: 'g' }),
		sacral: fn({ center: record.sacral, name: 'sacral' }),
		root: fn({ center: record.root, name: 'root' }),
		will: fn({ center: record.will, name: 'will' }),
		spleen: fn({ center: record.spleen, name: 'spleen' }),
		esp: fn({ center: record.esp, name: 'esp' })
	};
}

export const pipPropsStore = (
	gate: GateNumber,
	props: Readable<CenterDisplayProps>,
	x: (props: CenterDisplayProps) => number,
	y: (props: CenterDisplayProps) => number
): Readable<PipProps> =>
	derived(props, ($props) => ({
		gate,
		x: Math.round(x($props) * $props.scale + $props.x),
		y: Math.round(y($props) * $props.scale + $props.y),
		radius: Math.round($props.pipRadius * $props.scale)
	}));

export const CENTER_GATES = {
	head: ['64', '61', '63'] as const,
	ajna: ['47', '24', '4', '17', '43', '11'] as const,
	throat: ['62', '23', '56', '35', '12', '45', '33', '8', '31', '20', '16'] as const,
	g: ['7', '1', '13', '10', '25', '15', '46', '2'] as const,
	sacral: ['5', '14', '29', '59', '9', '3', '42', '27', '34'] as const,
	root: ['58', '38', '54', '53', '60', '52', '19', '39', '41'] as const,
	will: ['26', '51', '21', '40'] as const,
	spleen: ['48', '57', '44', '50', '32', '28', '18'] as const,
	esp: ['36', '22', '37', '6', '49', '55', '30'] as const
} as const;
type ChannelConf = [GateNumber, GateNumber, CenterName, CenterName, Point | null, Point | null];
const bottomArgs = [];
export const CHANNELS: ChannelConf[] = [
	['1', '8', 'g', 'throat', [0, 0], [0, 0]],
	['11', '56', 'ajna', 'throat', [0, 0], [0, 0]],
	['12', '22', 'throat', 'esp', [110, 10], [0, -290]],
	['13', '33', 'g', 'throat', [0, 0], [0, 0]],
	['16', '48', 'throat', 'spleen', [-122, 9], [0, -300]],
	['17', '62', 'ajna', 'throat', null, null],
	['18', '58', 'spleen', 'root', [18, 120], [-155, 0]],
	['30', '41', 'esp', 'root', [-18, 120], [155, 0]],
	['39', '55', 'root', 'esp', [150, 0], [-16, 110]],
	['28', '38', 'spleen', 'root', [16, 110], [-150, 0]],
	['32', '54', 'spleen', 'root', [14, 103], [-140, 0]],
	['19', '49', 'root', 'esp', [140, 0], [-14, 103]],
	['2', '14', 'g', 'sacral', [0, 0], [0, 0]],
	['21', '45', 'will', 'throat', [0, -100], [80, 30]],
	['23', '43', 'throat', 'ajna', [0, 0], [0, 0]],
	['24', '61', 'ajna', 'head', [0, 0], [0, 0]],
	['25', '51', 'g', 'will', [30, 0], [0, -30]],
	['26', '44', 'will', 'spleen', [-200, -5], [40, -100]],
	['6', '59', 'esp', 'sacral', [-40, 40], [50, 0]],
	['27', '50', 'sacral', 'spleen', [-50, 0], [40, 40]],
	['29', '46', 'sacral', 'g', [0, 0], [0, 0]],
	['3', '60', 'sacral', 'root', [0, 0], [0, 0]],
	['35', '36', 'throat', 'esp', [122, 9], [0, -300]],
	['37', '40', 'esp', 'will', [-1, -55], [40, 10]],
	['4', '63', 'ajna', 'head', [0, 0], [0, 0]],
	['42', '53', 'sacral', 'root', [0, 0], [0, 0]],
	['47', '64', 'ajna', 'head', [0, 0], [0, 0]],
	['5', '15', 'sacral', 'g', [0, 0], [0, 0]],
	['7', '31', 'g', 'throat', [0, 0], [0, 0]],
	['9', '52', 'sacral', 'root', [0, 0], [0, 0]],

	['10', '34', 'g', 'sacral', [-301, 0], [-301, 0]],
	['20', '57', 'throat', 'spleen', [-110, 10], [0, -290]]
];

const theOthers = [
	['34', '57', 'sacral', 'spleen', [-150, -100], [1, -100]],
	['10', '20', 'g', 'throat', [-120, 20], [-120, 0]],
	['20', '34', 'throat', 'sacral', [-201, 0], [-401, 0]]
];
