import type { GateNumber } from '$lib/hd';

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
