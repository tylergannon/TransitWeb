import { roundedTriangleHeight } from '$lib/components/hd/roundedPolygon';
import { derived, writable, type Readable, type Writable } from 'svelte/store';
import {
	mapCenterRecord,
	type BodyGraphProps,
	type CenterArgs,
	type CenterDisplayProps,
	type CenterRecord,
	type TriangleCenterProps
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

export const bodyGraphProps = (props: BodyGraphProps) => {
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

// const pipPositions = {
// };
//
