import type { CenterName, CenterRecord } from '$lib/hd/graph';

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

const DEFAULT_CENTER_ARGS: CenterRecord<CenterProps> = {
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

export default DEFAULT_CENTER_ARGS;
