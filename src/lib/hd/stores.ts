import { roundedTriangleHeight } from '$lib/components/hd/roundedPolygon';
import { derived, writable, type Readable, type Writable } from 'svelte/store';
import {
	mapCenterRecord,
	type BodyGraphProps,
	type CenterArgs,
	type CenterDisplayProps,
	type CenterRecord,
	type TriangleCenterProps,
	type CenterName
} from './graph';

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
	pipRadius: 16,
	distFromEdge: 5,
	height: 800,
	width: 667,
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

export const DEFAULT_CENTER_ARGS: CenterRecord<CenterProps> = {
	head: { name: 'head', x: 0, y: 80, shapeSize: 150 },
	ajna: { name: 'ajna', x: 0, y: 240, scale: 1.2, shapeSize: 150, rotation: 180 },
	throat: { name: 'throat', x: 0, y: 420, shape: 'square', shapeSize: 162 },
	g: { name: 'g', x: 0, y: 640, shape: 'square', shapeSize: 162, rotation: 45 },
	sacral: { name: 'sacral', x: 0, y: 900, shape: 'square', shapeSize: 162 },
	root: { name: 'root', x: 0, y: 1100, shape: 'square', shapeSize: 162 },
	will: { name: 'will', x: 150, y: 750, rotation: 15, shapeSize: 150 * 0.85 },
	spleen: { name: 'spleen', x: -300, y: 900, rotation: 90, shapeSize: 150 },
	esp: { name: 'esp', x: 300, y: 900, rotation: 270, shapeSize: 150 }
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

export const bodyGraphPropsStore = (props: BodyGraphProps) => {
	const { subscribe, update } = writable({
		...props
	} as BodyGraphProps);
	return {
		subscribe,
		update: (props: Partial<BodyGraphProps>) => update((state) => ({ ...state, ...props })),
		scaled: derived({ subscribe }, ($props) => {
			const scale = $props.scale;
			return {
				...$props,
				pipRadius: $props.pipRadius * scale,
				channelSpace: $props.channelSpace * scale,
				distFromEdge: $props.distFromEdge * scale,
				triangleSize: $props.triangleSize * scale,
				squareSize: $props.squareSize * scale
			} as BodyGraphProps;
		})
	};
};

export const centerArgs = (props: CenterArgs) => writable(props);

export const centersArgs = (
	graphProps: Readable<BodyGraphProps>,
	args: CenterRecord<Writable<CenterArgs>>
) => ({
	args,
	props: mapCenterRecord(({ center }) => centerDisplayProps(graphProps, center), args)
});

export const centerDisplayProps = (
	graphProps: Readable<BodyGraphProps>,
	centerArgs: Readable<CenterArgs>,
	shape: 'triangle' | 'square' = 'triangle'
): Readable<CenterDisplayProps> =>
	derived([graphProps, centerArgs], ([props, { x, y, scale, size }]) => ({
		x,
		y,
		size: size || (shape === 'triangle' ? props.triangleSize : props.squareSize),
		pipRadius: props.pipRadius,
		centerDx: 2 * props.pipRadius + props.channelSpace,
		height: roundedTriangleHeight(props.triangleSize),
		channelSpace: props.channelSpace,
		distFromEdge: props.distFromEdge,
		scale
	}));

export const triangleProps = (size: Readable<number>) =>
	derived(size, ($size) => {
		const height = roundedTriangleHeight($size);
		return {
			size: $size,
			height,
			halfHeight: height / 2
		} as TriangleCenterProps;
	});

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
