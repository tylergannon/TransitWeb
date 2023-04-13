import type { Point } from './types';

export const distance = (a: Point, b: Point) => {
	const [x1, y1] = a;
	const [x2, y2] = b;
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const ROUND_TO = 1000;
const rnd = (n: number) => Math.round(n * ROUND_TO) / ROUND_TO;

export const add = (a: Point, b: Point): Point => [rnd(a[0] + b[0]), rnd(a[1] + b[1])];

export const subtract = (a: Point, b: Point): Point => [rnd(a[0] - b[0]), rnd(a[1] - b[1])];

export const midpoint = (a: Point, b: Point) => {
	const [x1, y1] = a;
	const [x2, y2] = b;
	return [(x1 + x2) / 2, (y1 + y2) / 2];
};

export const scale = ([x, y]: Point, scale: number) => {
	return [x * scale, y * scale];
};
