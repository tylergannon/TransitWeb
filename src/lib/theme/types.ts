import type { GateNumber } from '$lib/hd/gateNumber';

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
