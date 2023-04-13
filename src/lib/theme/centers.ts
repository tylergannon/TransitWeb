import { entries } from '$lib/components/helper';
import type { CenterName, CenterRecord } from '$lib/hd';
import { pathFrom } from '$lib/svg';

import props, { triangleRatio } from './props';

export type CenterProps = {
	name: CenterName;
	x: number;
	y: number;
	shapeSize: number;
	shape?: 'triangle' | 'square';
	rotation?: number;
	scale?: number;
};

export interface CenterDisplayProps {
	name: CenterName;
	path: string;
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

const PROPS: CenterRecord<CenterProps> = {
	head: { name: 'head', x: 0, y: 80, shapeSize: props.triangleSize },
	ajna: { name: 'ajna', x: 0, y: 240, scale: 1, shapeSize: props.triangleSize, rotation: 180 },
	throat: { name: 'throat', x: 0, y: 420, shape: 'square', shapeSize: props.squareSize },
	g: { name: 'g', x: 0, y: 640, shape: 'square', shapeSize: props.squareSize, rotation: 45 },
	sacral: { name: 'sacral', x: 0, y: 900, shape: 'square', shapeSize: props.squareSize },
	root: { name: 'root', x: 0, y: 1110, shape: 'square', shapeSize: props.squareSize },
	will: { name: 'will', x: 175, y: 715, rotation: 13, shapeSize: props.triangleSize * 0.85 },
	spleen: { name: 'spleen', x: -300, y: 880, rotation: 90, shapeSize: props.squareSize },
	esp: { name: 'esp', x: 300, y: 880, rotation: 270, shapeSize: props.squareSize }
};

const roundedTriangleHeight = (size: number, r = triangleRatio) => size * (1 - 0.134 / (1 + 2 * r));

const _props = ({
	shapeSize,
	scale: _scale,
	x,
	y,
	name,
	...p
}: CenterProps): CenterDisplayProps => {
	const scale = props.scale * (_scale || 1);
	return {
		name,
		x,
		y,
		path: pathFrom([x, y])
			.rotate(p.rotation || 0)
			.shape(p.shape || 'triangle', shapeSize)
			.toString(),
		scale,
		pipRadius: props.pipRadius * scale,
		channelSpace: props.channelSpace * scale,
		distFromEdge: props.distFromEdge * scale,
		size: shapeSize * scale,
		height: (p.shape === 'square' ? shapeSize : roundedTriangleHeight(shapeSize)) * scale,
		centerDx: scale * (2 * props.pipRadius + props.channelSpace)
	};
};

const def = Object.fromEntries(
	entries(PROPS).map(([name, p]) => [name, _props(p)])
) as CenterRecord<CenterDisplayProps>;

export default def;
