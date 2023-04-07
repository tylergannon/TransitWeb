import type { CenterName } from '$lib/hd/graph';
import type { GateNumber } from '$lib/hd/gateNumber';
import type { Point } from '$lib/svg/types';

export type ChannelConf = [
	GateNumber,
	GateNumber,
	CenterName,
	CenterName,
	Point | null,
	Point | null
];

const CHANNELS: ChannelConf[] = [
	['1', '8', 'g', 'throat', [0, 0], [0, 0]],
	['11', '56', 'ajna', 'throat', [0, 0], [0, 0]],
	['12', '22', 'throat', 'esp', [110, 10], [0, -290]],
	['13', '33', 'g', 'throat', [0, 0], [0, 0]],
	['16', '48', 'throat', 'spleen', [-122, 9], [0, -300]],
	['17', '62', 'ajna', 'throat', null, null],
	['18', '58', 'spleen', 'root', [18, 120], [-155, 0]],
	['30', '41', 'esp', 'root', [-18, 120], [155, 0]],
	['39', '55', 'root', 'esp', [150, 0], [-16, 110]],
	['28', '38', 'spleen', 'root', [16, 110], [-150, 0]],
	['32', '54', 'spleen', 'root', [14, 103], [-140, 0]],
	['19', '49', 'root', 'esp', [140, 0], [-14, 103]],
	['2', '14', 'g', 'sacral', [0, 0], [0, 0]],
	['21', '45', 'will', 'throat', [0, -100], [80, 30]],
	['23', '43', 'throat', 'ajna', [0, 0], [0, 0]],
	['24', '61', 'ajna', 'head', [0, 0], [0, 0]],
	['25', '51', 'g', 'will', [30, 0], [0, -30]],
	['26', '44', 'will', 'spleen', [-200, -5], [40, -100]],
	['6', '59', 'esp', 'sacral', [-40, 40], [50, 0]],
	['27', '50', 'sacral', 'spleen', [-50, 0], [40, 40]],
	['29', '46', 'sacral', 'g', [0, 0], [0, 0]],
	['3', '60', 'sacral', 'root', [0, 0], [0, 0]],
	['35', '36', 'throat', 'esp', [122, 9], [0, -300]],
	['37', '40', 'esp', 'will', [-1, -55], [40, 10]],
	['4', '63', 'ajna', 'head', [0, 0], [0, 0]],
	['42', '53', 'sacral', 'root', [0, 0], [0, 0]],
	['47', '64', 'ajna', 'head', [0, 0], [0, 0]],
	['5', '15', 'sacral', 'g', [0, 0], [0, 0]],
	['7', '31', 'g', 'throat', [0, 0], [0, 0]],
	['9', '52', 'sacral', 'root', [0, 0], [0, 0]],

	['10', '34', 'g', 'sacral', [-301, 0], [-301, 0]],
	['20', '57', 'throat', 'spleen', [-110, 10], [0, -290]]
];

const theOthers = [
	['34', '57', 'sacral', 'spleen', [-150, -100], [1, -100]],
	['10', '20', 'g', 'throat', [-120, 20], [-120, 0]],
	['20', '34', 'throat', 'sacral', [-201, 0], [-401, 0]],
	['10', '57', 'g', 'spleen', [-301, 0], [-301, 0]]
];

export default CHANNELS;
