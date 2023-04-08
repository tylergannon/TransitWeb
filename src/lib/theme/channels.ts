import type { CenterName } from '$lib/hd';
import type { GateNumber } from '$lib/hd';
import type { Point } from '$lib/svg/types';
export type DashLength = number | null;
export type ChannelConf = [
	GateNumber,
	GateNumber,
	CenterName,
	CenterName,
	DashLength,
	Point | null,
	Point | null
];

const CHANNELS: ChannelConf[] = [
	['1', '8', 'g', 'throat', null, [0, 0], [0, 0]],
	['11', '56', 'ajna', 'throat', null, [0, 0], [0, 0]],
	['12', '22', 'throat', 'esp', null, [110, 10], [0, -290]],
	['13', '33', 'g', 'throat', null, [0, 0], [0, 0]],
	['16', '48', 'throat', 'spleen', null, [-122, 9], [0, -300]],
	['17', '62', 'ajna', 'throat', null, null, null],
	['18', '58', 'spleen', 'root', null, [18, 120], [-155, 0]],
	['30', '41', 'esp', 'root', null, [-18, 120], [155, 0]],
	['39', '55', 'root', 'esp', null, [150, 0], [-16, 110]],
	['28', '38', 'spleen', 'root', null, [16, 110], [-150, 0]],
	['32', '54', 'spleen', 'root', null, [14, 103], [-140, 0]],
	['19', '49', 'root', 'esp', null, [140, 0], [-14, 103]],
	['2', '14', 'g', 'sacral', null, [0, 0], [0, 0]],
	['21', '45', 'will', 'throat', null, [0, -100], [80, 30]],
	['23', '43', 'throat', 'ajna', null, [0, 0], [0, 0]],
	['24', '61', 'ajna', 'head', null, [0, 0], [0, 0]],
	['25', '51', 'g', 'will', null, [30, 0], [0, -30]],
	['26', '44', 'will', 'spleen', null, [-200, -5], [40, -100]],
	['6', '59', 'esp', 'sacral', null, [-40, 40], [50, 0]],
	['27', '50', 'sacral', 'spleen', null, [-50, 0], [40, 40]],
	['29', '46', 'sacral', 'g', null, [0, 0], [0, 0]],
	['3', '60', 'sacral', 'root', null, [0, 0], [0, 0]],
	['35', '36', 'throat', 'esp', null, [122, 9], [0, -300]],
	['37', '40', 'esp', 'will', null, [-1, -55], [40, 10]],
	['4', '63', 'ajna', 'head', null, [0, 0], [0, 0]],
	['42', '53', 'sacral', 'root', null, [0, 0], [0, 0]],
	['47', '64', 'ajna', 'head', null, [0, 0], [0, 0]],
	['5', '15', 'sacral', 'g', null, [0, 0], [0, 0]],
	['7', '31', 'g', 'throat', null, [0, 0], [0, 0]],
	['9', '52', 'sacral', 'root', null, [0, 0], [0, 0]],

	['10', '34', 'g', 'sacral', null, [-301, 0], [-301, 0]],
	['20', '57', 'throat', 'spleen', null, [-110, 10], [0, -290]]
];

const theOthers = [
	['34', '57', 'sacral', 'spleen', null, [-150, -100], [1, -100]],
	['10', '20', 'g', 'throat', null, [-120, 20], [-120, 0]],
	['20', '34', 'throat', 'sacral', null, [-201, 0], [-401, 0]],
	['10', '57', 'g', 'spleen', null, [-301, 0], [-301, 0]]
];

export default CHANNELS;
