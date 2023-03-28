import type { CenterDisplayProps } from './graph';

export const leftChannelX = ({ centerDx }: CenterDisplayProps) => -centerDx;
export const centerChannelX = (props: CenterDisplayProps) => 0;
export const rightChannelX = ({ centerDx }: CenterDisplayProps) => centerDx;
export const triangleBottomY = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	height / 2 - pipRadius - distFromEdge;
export const triangleTopY = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	-height / 2 + pipRadius + distFromEdge;
export const top = ({ size, pipRadius, distFromEdge }: CenterDisplayProps) =>
	-size / 2 + pipRadius + distFromEdge;
export const bottom = ({ size, pipRadius, distFromEdge }: CenterDisplayProps) =>
	size / 2 - pipRadius - distFromEdge;
export const left = top;
export const right = bottom;
export const topChannelY = leftChannelX;
export const bottomChannelY = rightChannelX;
export const middleChannelY = centerChannelX;
