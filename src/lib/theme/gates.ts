import type { CENTER_GATES, CenterName } from '$lib/hd/graph';
import type { CenterDisplayProps } from './types';

const leftChannelX = ({ centerDx }: CenterDisplayProps) => -centerDx;
const centerChannelX = (props: CenterDisplayProps) => 0;
const rightChannelX = ({ centerDx }: CenterDisplayProps) => centerDx;
const triangleBottomY = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	height / 2 - pipRadius - distFromEdge;
const triangleTopY = ({ height, pipRadius, distFromEdge }: CenterDisplayProps) =>
	-height / 2 + pipRadius + distFromEdge;
const top = ({ size, pipRadius, distFromEdge }: CenterDisplayProps) =>
	-size / 2 + pipRadius + distFromEdge;
const bottom = ({ size, pipRadius, distFromEdge }: CenterDisplayProps) =>
	size / 2 - pipRadius - distFromEdge;
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

export type GatesRecord<T extends CenterName, U = GateArgs> = {
	[key in (typeof CENTER_GATES)[T][number]]: U;
};

export type GatesConf<T = GateArgs> = {
	head: GatesRecord<'head', T>;
	ajna: GatesRecord<'ajna', T>;
	throat: GatesRecord<'throat', T>;
	g: GatesRecord<'g', T>;
	sacral: GatesRecord<'sacral', T>;
	root: GatesRecord<'root', T>;
	spleen: GatesRecord<'spleen', T>;
	esp: GatesRecord<'esp', T>;
	will: GatesRecord<'will', T>;
};

export const buildGatesConfig = <T = GateArgs>(props: GatesConf<T>) => props;

export default buildGatesConfig<GateArgs>({
	ajna: {
		'4': [rightChannelX, triangleTopY],
		'11': [rightChannelX, fact(0.05)],
		'17': [leftChannelX, fact(0.05)],
		'24': [centerChannelX, triangleTopY],
		'43': [centerChannelX, triangleBottomY],
		'47': [leftChannelX, triangleTopY]
	},
	esp: {
		'6': [left, middleChannelY],
		'22': [fact(0), fact(-0.27)],
		'30': [fact(0.2), fact(0.36)],
		'36': [fact(0.2), fact(-0.36)],
		'37': [fact(-0.2), fact(-0.17)],
		'49': [fact(-0.2), fact(0.17)],
		'55': [fact(0), fact(0.27)]
	},
	g: {
		'1': [centerChannelX, fact(-0.45)],
		'2': [centerChannelX, fact(0.45)],
		'7': [leftChannelX, fact(-0.3)],
		'10': [fact(-0.45), middleChannelY],
		'13': [rightChannelX, fact(-0.3)],
		'15': [leftChannelX, fact(0.3)],
		'25': [fact(0.45), middleChannelY],
		'46': [rightChannelX, fact(0.3)]
	},
	head: {
		'61': [middleChannelY, triangleBottomY],
		'63': [rightChannelX, triangleBottomY],
		'64': [leftChannelX, triangleBottomY]
	},
	root: {
		'19': [right, topChannelY],
		'38': [left, middleChannelY],
		'39': [right, middleChannelY],
		'41': [right, bottomChannelY],
		'52': [rightChannelX, top],
		'53': [leftChannelX, top],
		'54': [left, topChannelY],
		'58': [left, bottomChannelY],
		'60': [centerChannelX, top]
	},
	sacral: {
		'3': [centerChannelX, bottom],
		'5': [leftChannelX, top],
		'9': [rightChannelX, bottom],
		'14': [centerChannelX, top],
		'27': [left, bottomChannelY],
		'29': [rightChannelX, top],
		'34': [left, topChannelY],
		'42': [leftChannelX, bottom],
		'59': [right, bottomChannelY]
	},
	spleen: {
		'18': [fact(-0.2), fact(0.36)],
		'28': [fact(0), fact(0.27)],
		'32': [fact(0.2), fact(0.17)],
		'44': [fact(0.2), fact(-0.17)],
		'48': [fact(-0.2), fact(-0.36)],
		'50': [right, middleChannelY],
		'57': [fact(0), fact(-0.27)]
	},
	throat: {
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
		'62': [leftChannelX, top]
	},
	will: {
		'21': [fact(0.05), fact(-0.3)],
		'26': [fact(-0.38), fact(0.1)],
		'40': [fact(0.2), fact(0.26)],
		'51': [fact(-0.15), fact(-0.1)]
	}
});
