import type { CenterName } from '$lib/hd';
import type { GateNumber } from '$lib/hd';
import type { Point } from '$lib/svg/types';
export type DashLength = number | null;

type PolyConfig = { inner: string; outer: string };

export type ChannelConf = [
	GateNumber,
	GateNumber,
	CenterName,
	CenterName,
	DashLength,
	Point | null,
	Point | null,
	PolyConfig | null
];

const curves = {
	curve12_9: {
		outer: 'v-50 h-400 v500 h400',
		inner: 'v500 h-300'
	} as PolyConfig,
	curve9_6: {
		outer: 'v30 h-50 v250 h375 v-375',
		inner: 'h300 v150'
	} as PolyConfig,
	horiz: {
		outer: 'v150 h-150 v-150',
		inner: 'v-150 h-150 v150'
	} as PolyConfig
};

const CHANNELS: ChannelConf[] = [
	['1', '8', 'g', 'throat', null, [0, 0], [0, 0], null],
	['10', '34', 'g', 'sacral', null, [-301, 0], [-301, 0], null],
	['11', '56', 'ajna', 'throat', null, [0, 0], [0, 0], null],
	['12', '22', 'throat', 'esp', null, [110, 10], [0, -290], null],
	['13', '33', 'g', 'throat', null, [0, 0], [0, 0], null],
	['16', '48', 'throat', 'spleen', null, [-122, 9], [0, -300], curves.curve12_9],
	['17', '62', 'ajna', 'throat', null, null, null, null],
	['18', '58', 'spleen', 'root', null, [18, 120], [-155, 0], curves.curve9_6],
	[
		'19',
		'49',
		'root',
		'esp',
		null,
		[140, 0],
		[-14, 103],
		{ inner: 'v-200 h300', outer: 'v30 h300 v-250' }
	],
	[
		'2',
		'14',
		'g',
		'sacral',
		null,
		[0, 0],
		[0, 0],
		{ inner: 'v-200 h300', outer: 'v30 h300 v-250' }
	],
	['20', '57', 'throat', 'spleen', null, [-110, 10], [0, -290], curves.curve12_9],
	['21', '45', 'will', 'throat', null, [0, -100], [80, 30], null],
	['23', '43', 'throat', 'ajna', null, [0, 0], [0, 0], null],
	['24', '61', 'ajna', 'head', null, [0, 0], [0, 0], null],
	['25', '51', 'g', 'will', null, [30, 0], [0, -30], null],
	['26', '44', 'will', 'spleen', null, [-200, -5], [40, -100], curves.curve12_9],
	['27', '50', 'sacral', 'spleen', null, [-50, 0], [40, 40], curves.horiz],
	['28', '38', 'spleen', 'root', null, [16, 110], [-150, 0], curves.curve9_6],
	['29', '46', 'sacral', 'g', null, [0, 0], [0, 0], null],
	['3', '60', 'sacral', 'root', null, [0, 0], [0, 0], null],
	['30', '41', 'esp', 'root', null, [-18, 120], [155, 0], null],
	['32', '54', 'spleen', 'root', null, [14, 103], [-140, 0], curves.curve9_6],
	['35', '36', 'throat', 'esp', null, [122, 9], [0, -300], null],
	['37', '40', 'esp', 'will', null, [-1, -55], [40, 10], null],
	['39', '55', 'root', 'esp', null, [150, 0], [-16, 110], null],
	['4', '63', 'ajna', 'head', null, [0, 0], [0, 0], null],
	['42', '53', 'sacral', 'root', null, [0, 0], [0, 0], null],
	['47', '64', 'ajna', 'head', null, [0, 0], [0, 0], null],
	['5', '15', 'sacral', 'g', null, [0, 0], [0, 0], null],
	['6', '59', 'esp', 'sacral', null, [-40, 40], [50, 0], curves['horiz']],
	['7', '31', 'g', 'throat', null, [0, 0], [0, 0], null],
	['9', '52', 'sacral', 'root', null, [0, 0], [0, 0], null]
];

const theOthers = [
	['34', '57', 'sacral', 'spleen', null, [-150, -100], [1, -100], null],
	['10', '20', 'g', 'throat', null, [-120, 20], [-120, 0], null],
	['20', '34', 'throat', 'sacral', null, [-201, 0], [-401, 0], null],
	['10', '57', 'g', 'spleen', null, [-301, 0], [-301, 0], null]
];

export default CHANNELS;
