import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type { BodyGraphProps, CenterArgs, CenterRecord, CenterName } from './graph';

const roundedTriangleHeight = (size: number, r = 0.6) => size * (1 - 0.134 / (1 + 2 * r));

export type GateNumber =
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| '11'
	| '12'
	| '13'
	| '14'
	| '15'
	| '16'
	| '17'
	| '18'
	| '19'
	| '20'
	| '21'
	| '22'
	| '23'
	| '24'
	| '25'
	| '26'
	| '27'
	| '28'
	| '29'
	| '30'
	| '31'
	| '32'
	| '33'
	| '34'
	| '35'
	| '36'
	| '37'
	| '38'
	| '39'
	| '40'
	| '41'
	| '42'
	| '43'
	| '44'
	| '45'
	| '46'
	| '47'
	| '48'
	| '49'
	| '50'
	| '51'
	| '52'
	| '53'
	| '54'
	| '55'
	| '56'
	| '57'
	| '58'
	| '59'
	| '60'
	| '61'
	| '62'
	| '63'
	| '64';
export type GateRecord<T> = Record<GateNumber, T>;

export const DEFAULT_GRAPH_PROPS: BodyGraphProps = {
	channelSpace: 2,
	pipRadius: 19,
	distFromEdge: 5,
	aspectRatio: 0.83,
	width: 600,
	scale: 1,
	triangleSize: 150,
	squareSize: 162
};

export type CenterProps = {
	name: CenterName;
	x: number;
	y: number;
	shapeSize: number;
	shape?: 'triangle' | 'square';
	rotation?: number;
	scale?: number;
};
const shapeSize = 160,
	size2 = 182;
export const DEFAULT_CENTER_ARGS: CenterRecord<CenterProps> = {
	head: { name: 'head', x: 0, y: 80, shapeSize: shapeSize },
	ajna: { name: 'ajna', x: 0, y: 240, scale: 1, shapeSize: shapeSize, rotation: 180 },
	throat: { name: 'throat', x: 0, y: 420, shape: 'square', shapeSize: size2 },
	g: { name: 'g', x: 0, y: 640, shape: 'square', shapeSize: size2, rotation: 45 },
	sacral: { name: 'sacral', x: 0, y: 900, shape: 'square', shapeSize: size2 },
	root: { name: 'root', x: 0, y: 1100, shape: 'square', shapeSize: size2 },
	will: { name: 'will', x: 160, y: 710, rotation: 15, shapeSize: shapeSize * 0.85 },
	spleen: { name: 'spleen', x: -300, y: 880, rotation: 90, shapeSize: size2 },
	esp: { name: 'esp', x: 300, y: 880, rotation: 270, shapeSize: size2 }
};

/**
 *
 * @param props
 * @returns Body graph props with all values scaled by the scale property
 */
export const bodyGraphProps = (props: Partial<BodyGraphProps> = {}) => {
	const res = { ...DEFAULT_GRAPH_PROPS, ...props };
	const { scale } = res;
	return {
		...res,
		pipRadius: res.pipRadius * scale,
		channelSpace: res.channelSpace * scale,
		distFromEdge: res.distFromEdge * scale,
		triangleSize: res.triangleSize * scale,
		squareSize: res.squareSize * scale
	} as BodyGraphProps;
};

export const centerArgs = (props: CenterArgs) => writable(props);

export interface GateDisplay {
	x: number;
	y: number;
	visible?: boolean;
	color?: string;
	fill?: string;
	stroke?: string;
}

export const gateDisplay = (props: GateDisplay) => {
	const { subscribe, update } = writable(props);
	return {
		subscribe,
		update: (props: Partial<GateDisplay>) => update((state) => ({ ...state, ...props }))
	};
};

export const channelPos = 9;
