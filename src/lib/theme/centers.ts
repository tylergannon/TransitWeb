import { entries } from '$lib/components/helper';
import type { CenterName, CenterRecord } from '$lib/hd';

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

export interface CenterDisplayProps extends CenterProps {
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

const shapeSize = 160,
	size2 = 182;

const PROPS: CenterRecord<CenterProps> = {
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

const roundedTriangleHeight = (size: number, r = triangleRatio) => size * (1 - 0.134 / (1 + 2 * r));

const _props = ({ shapeSize, scale: _scale, ...p }: CenterProps): CenterDisplayProps => {
	const scale = props.scale * (_scale || 1);
	return {
		...p,
		scale,
		shapeSize,
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
