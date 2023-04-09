import type { GateNumber } from '$lib/hd';
import type { GateRecord } from '$lib/hd/gateNumber';
import centersProps from './centers';
import { gates } from '$lib/hd/graph';
import type { CenterDisplayProps } from './centers';
import { entries } from '$lib/components/helper';

const leftChannelX = ({ centerDx }: CenterDisplayProps) => -centerDx;
const centerChannelX = (props: CenterDisplayProps) => 0;
const rightChannelX = ({ centerDx }: CenterDisplayProps) => centerDx;
const triangleBottomY = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	height / 2 - pipRadius - distFromEdge;
const triangleTopY = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	-height / 2 + pipRadius + distFromEdge;
const top = ({ size, pipRadius, distFromEdge }: CenterDisplayProps) =>
	-size / 2 + pipRadius + distFromEdge;
const bottom = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	height / 2 - pipRadius - distFromEdge;
const left = top;
const right = bottom;
const topChannelY = leftChannelX;
const bottomChannelY = rightChannelX;
const middleChannelY = centerChannelX;

const fact =
	(n: number): ((p: CenterDisplayProps) => number) =>
	({ size }) =>
		size * n;

/**
 * A tuple of functions that return the x and y coordinates of a gate
 */
export type GateArgs = [
	(props: CenterDisplayProps) => number,
	(props: CenterDisplayProps) => number
];

export interface PipProps {
	gate: GateNumber;
	x: number;
	y: number;
	radius: number;
}

export const buildGatesConfig = <T = GateArgs>(props: GateRecord<T>) => props;

export const builder = buildGatesConfig<GateArgs>({
	'4': [rightChannelX, triangleTopY],
	'11': [rightChannelX, fact(0.05)],
	'17': [leftChannelX, fact(0.05)],
	'24': [centerChannelX, triangleTopY],
	'43': [centerChannelX, triangleBottomY],
	'47': [leftChannelX, triangleTopY],
	'6': [left, middleChannelY],
	'22': [fact(0), fact(-0.27)],
	'30': [fact(0.2), fact(0.36)],
	'36': [fact(0.2), fact(-0.36)],
	'37': [fact(-0.2), fact(-0.17)],
	'49': [fact(-0.2), fact(0.17)],
	'55': [fact(0), fact(0.27)],
	'1': [centerChannelX, fact(-0.45)],
	'2': [centerChannelX, fact(0.45)],
	'7': [leftChannelX, fact(-0.3)],
	'10': [fact(-0.45), middleChannelY],
	'13': [rightChannelX, fact(-0.3)],
	'15': [leftChannelX, fact(0.3)],
	'25': [fact(0.45), middleChannelY],
	'46': [rightChannelX, fact(0.3)],
	'61': [middleChannelY, triangleBottomY],
	'63': [rightChannelX, triangleBottomY],
	'64': [leftChannelX, triangleBottomY],
	'19': [right, topChannelY],
	'38': [left, middleChannelY],
	'39': [right, middleChannelY],
	'41': [right, bottomChannelY],
	'52': [rightChannelX, top],
	'53': [leftChannelX, top],
	'54': [left, topChannelY],
	'58': [left, bottomChannelY],
	'60': [centerChannelX, top],
	'3': [centerChannelX, bottom],
	'5': [leftChannelX, top],
	'9': [rightChannelX, bottom],
	'14': [centerChannelX, top],
	'27': [left, bottomChannelY],
	'29': [rightChannelX, top],
	'34': [left, topChannelY],
	'42': [leftChannelX, bottom],
	'59': [right, bottomChannelY],
	'18': [fact(-0.2), fact(0.36)],
	'28': [fact(0), fact(0.27)],
	'32': [fact(0.2), fact(0.17)],
	'44': [fact(0.2), fact(-0.17)],
	'48': [fact(-0.2), fact(-0.36)],
	'50': [right, middleChannelY],
	'57': [fact(0), fact(-0.27)],
	'8': [centerChannelX, bottom],
	'12': [right, middleChannelY],
	'16': [left, topChannelY],
	'20': [left, middleChannelY],
	'23': [centerChannelX, top],
	'31': [leftChannelX, bottom],
	'33': [rightChannelX, bottom],
	'35': [right, topChannelY],
	'45': [right, bottomChannelY],
	'56': [rightChannelX, top],
	'62': [leftChannelX, top],
	'21': [fact(0.05), fact(-0.3)],
	'26': [fact(-0.38), fact(0.1)],
	'40': [fact(0.2), fact(0.26)],
	'51': [fact(-0.15), fact(-0.1)]
});

const outer = ([gateNum, props]: [GateNumber, GateArgs]): [GateNumber, PipProps] => {
	const args = centersProps[gates[gateNum].center];
	return [
		gateNum,
		{
			gate: gateNum,
			x: props[0](args) + args.x,
			y: props[1](args) + args.y,
			radius: centersProps[gates[gateNum].center].pipRadius
		}
	];
};

const buildConf = (args: GateRecord<GateArgs>) =>
	Object.fromEntries(entries(args).map(outer)) as GateRecord<PipProps>;

const defaultConfig = buildConf(builder);

export default defaultConfig;
