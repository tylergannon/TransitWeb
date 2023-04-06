import { gateLines } from '$lib/hd/chart';
import type { GateNumber } from '$lib/hd/stores';
import { SvgPath } from './path';
import type { Point } from './types';

const widthRatio = 0.8;
const gapRatio = 0.25;
const strokeRatio = 0.12;

export const hexagram = (num: GateNumber, size: number, cX = 0, cY = 0) => {
	const lines = gateLines(num),
		startY = (size * (1 - strokeRatio)) / 2,
		deltaY = (size * (1 - strokeRatio)) / 5,
		endX = (size * widthRatio) / 2;

	let p = new SvgPath();

	for (let i = 0; i < lines.length; i++) {
		const y = cY + startY - i * deltaY;
		p = p.move([cX - endX, y], 'M');
		if (!lines[i]) {
			p = p.line([endX - (size * gapRatio) / 2, 0]).move([size * gapRatio, 0]);
		}
		p = p.line([cX + endX, y], 'L');
	}
	return p.toString();
};
