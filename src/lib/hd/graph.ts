import type { GateNumber, GateRecord } from './gateNumber';
import type { Chart, PlanetName, Position } from './chart';
import { entries, keys } from '$lib/components/helper';

export type CenterName =
	| 'head'
	| 'ajna'
	| 'throat'
	| 'g'
	| 'sacral'
	| 'root'
	| 'will'
	| 'spleen'
	| 'esp';
export type CenterRecord<T> = Record<CenterName, T>;

const CENTER_GATES = {
	head: ['64', '61', '63'] as const,
	ajna: ['47', '24', '4', '17', '43', '11'] as const,
	throat: ['62', '23', '56', '35', '12', '45', '33', '8', '31', '20', '16'] as const,
	g: ['7', '1', '13', '10', '25', '15', '46', '2'] as const,
	sacral: ['5', '14', '29', '59', '9', '3', '42', '27', '34'] as const,
	root: ['58', '38', '54', '53', '60', '52', '19', '39', '41'] as const,
	will: ['26', '51', '21', '40'] as const,
	spleen: ['48', '57', '44', '50', '32', '28', '18'] as const,
	esp: ['36', '22', '37', '6', '49', '55', '30'] as const
} as const;

export type GatesRecord<T extends CenterName, U> = {
	[key in (typeof CENTER_GATES)[T][number]]: U;
};

const channels = {
	'1_8': {
		gates: ['1', '8'],
		centers: ['g', 'throat']
	},

	'11_56': {
		gates: ['11', '56'],
		centers: ['ajna', 'throat']
	},

	'12_22': {
		gates: ['12', '22'],
		centers: ['throat', 'esp']
	},

	'13_33': {
		gates: ['13', '33'],
		centers: ['g', 'throat']
	},

	'16_48': {
		gates: ['16', '48'],
		centers: ['throat', 'spleen']
	},

	'17_62': {
		gates: ['17', '62'],
		centers: ['ajna', 'throat']
	},

	'18_58': {
		gates: ['18', '58'],
		centers: ['spleen', 'root']
	},

	'30_41': {
		gates: ['30', '41'],
		centers: ['esp', 'root']
	},

	'39_55': {
		gates: ['39', '55'],
		centers: ['root', 'esp']
	},

	'28_38': {
		gates: ['28', '38'],
		centers: ['spleen', 'root']
	},

	'32_54': {
		gates: ['32', '54'],
		centers: ['spleen', 'root']
	},

	'19_49': {
		gates: ['19', '49'],
		centers: ['root', 'esp']
	},

	'2_14': {
		gates: ['2', '14'],
		centers: ['g', 'sacral']
	},

	'21_45': {
		gates: ['21', '45'],
		centers: ['will', 'throat']
	},

	'23_43': {
		gates: ['23', '43'],
		centers: ['throat', 'ajna']
	},

	'24_61': {
		gates: ['24', '61'],
		centers: ['ajna', 'head']
	},

	'25_51': {
		gates: ['25', '51'],
		centers: ['g', 'will']
	},

	'26_44': {
		gates: ['26', '44'],
		centers: ['will', 'spleen']
	},

	'6_59': {
		gates: ['6', '59'],
		centers: ['esp', 'sacral']
	},

	'27_50': {
		gates: ['27', '50'],
		centers: ['sacral', 'spleen']
	},

	'29_46': {
		gates: ['29', '46'],
		centers: ['sacral', 'g']
	},

	'3_60': {
		gates: ['3', '60'],
		centers: ['sacral', 'root']
	},

	'35_36': {
		gates: ['35', '36'],
		centers: ['throat', 'esp']
	},

	'37_40': {
		gates: ['37', '40'],
		centers: ['esp', 'will']
	},

	'4_63': {
		gates: ['4', '63'],
		centers: ['ajna', 'head']
	},

	'42_53': {
		gates: ['42', '53'],
		centers: ['sacral', 'root']
	},

	'47_64': {
		gates: ['47', '64'],
		centers: ['ajna', 'head']
	},

	'5_15': {
		gates: ['5', '15'],
		centers: ['sacral', 'g']
	},

	'7_31': {
		gates: ['7', '31'],
		centers: ['g', 'throat']
	},

	'9_52': {
		gates: ['9', '52'],
		centers: ['sacral', 'root']
	},

	'10_34': {
		gates: ['10', '34'],
		centers: ['g', 'sacral']
	},

	'20_57': {
		gates: ['20', '57'],
		centers: ['throat', 'spleen']
	},

	'34_57': {
		gates: ['34', '57'],
		centers: ['sacral', 'spleen']
	},

	'10_20': {
		gates: ['10', '20'],
		centers: ['g', 'throat']
	},

	'20_34': {
		gates: ['20', '34'],
		centers: ['throat', 'sacral']
	},

	'10_57': {
		gates: ['10', '57'],
		centers: ['g', 'spleen']
	}
};

export type ChannelName = keyof typeof channels;
export type ChannelRecord<T> = Record<ChannelName, T>;
type Channel = { gates: [GateNumber, GateNumber]; centers: [CenterName, CenterName] };
export const channel = (name: ChannelName) => channels[name] as Channel;

/**
 * Lists each component chart and planet that define the gate, as well as any channels
 * completed by the gate (usually 0 or 1 but can be 2 or 3 for 10|20|34|57).
 */
export type _GateConf = [[PlanetName, number][], ChannelName[]];

/**
 * The data needed by graph components to render a chart.
 */
export type Linkage = {
	charts: Chart[];
	channels: ChannelName[];
	gates: Partial<Record<GateNumber, _GateConf>>;
	centers: Partial<Record<CenterName, ChannelName[]>>;
	data: Array<{ name: string; displayName: string; color: string }>;
};

interface GraphComponentProps {
	chart: Chart;
	name: string;
	color: string;
	displayName: string;
	link?: string | (() => void);
}

export const chartLinkage = (charts: GraphComponentProps[]): Linkage => {
	const _gates: Partial<Record<GateNumber, _GateConf>> = {};

	const addGate = (planet: PlanetName, { gate }: Position, idx: number) => {
		if (_gates[gate]) _gates[gate]?.[0].push([planet, idx]);
		else _gates[gate] = [[[planet, idx]], []];
	};

	const _charts = charts.map((a) => a.chart);

	_charts.forEach(({ chartDateJson, chiron, ...chart }, idx) =>
		Object.entries(chart).forEach(([planet, pos]) => addGate(planet as PlanetName, pos, idx))
	);

	const ch = entries(channels)
		.filter(([_, { gates }]) => gates.every((gate) => gate in _gates))
		.map(([name, { gates }]) => {
			gates.forEach((gate) => _gates[gate as GateNumber]?.[1].push(name as ChannelName));
			return name;
		}) as ChannelName[];

	// Get centers as a reduction of the channels found.
	const _centers = ch.reduce((acc, val) => {
		const channel = channels[val] as Channel;
		for (const center of channel.centers) {
			if (center in acc) acc[center].push(val);
			else acc[center] = [val];
		}
		return acc;
	}, {} as Record<CenterName, ChannelName[]>);

	return {
		charts: _charts,
		channels: ch,
		gates: _gates,
		centers: _centers,
		data: charts.map(({ name, color, displayName }) => ({ name, color, displayName }))
	};
};

export const findCenters = (ch: ChannelName[]) => {
	const centers = new Set<CenterName>();
	ch.forEach((channel) =>
		(channels[channel] as Channel).centers.forEach((center) => centers.add(center))
	);
	return Array.from(centers);
};

export const centers: CenterRecord<{ gates: GateNumber[]; channels: ChannelName[] }> = {
	head: {
		gates: ['64', '63', '61'],
		channels: ['24_61', '47_64', '4_63']
	},

	throat: {
		gates: ['56', '8', '23', '12', '20', '16', '31', '35', '45', '62', '33'],
		channels: [
			'10_20',
			'11_56',
			'12_22',
			'16_48',
			'17_62',
			'1_8',
			'23_43',
			'35_36',
			'20_57',
			'20_34',
			'21_45',
			'13_33',
			'7_31'
		]
	},

	sacral: {
		gates: ['14', '34', '27', '5', '3', '29', '42', '9', '59'],
		channels: [
			'5_15',
			'27_50',
			'6_59',
			'10_34',
			'9_52',
			'29_46',
			'42_53',
			'2_14',
			'20_34',
			'3_60',
			'34_57'
		]
	},

	g: {
		gates: ['13', '15', '25', '1', '7', '2', '46', '10'],
		channels: ['10_20', '5_15', '10_57', '10_34', '1_8', '29_46', '2_14', '13_33', '7_31', '25_51']
	},

	spleen: {
		gates: ['32', '57', '48', '18', '50', '28', '44'],
		channels: ['26_44', '10_57', '27_50', '16_48', '20_57', '32_54', '18_58', '28_38', '34_57']
	},

	root: {
		gates: ['60', '19', '54', '53', '41', '39', '38', '52', '58'],
		channels: ['3_60', '39_55', '19_49', '30_41', '9_52', '42_53', '32_54', '18_58', '28_38']
	},

	will: {
		gates: ['40', '51', '21', '26'],
		channels: ['26_44', '37_40', '25_51', '21_45']
	},

	esp: {
		gates: ['6', '22', '37', '55', '30', '36', '49'],
		channels: ['6_59', '12_22', '39_55', '19_49', '37_40', '30_41', '35_36']
	},

	ajna: {
		gates: ['4', '47', '24', '43', '11', '17'],
		channels: ['11_56', '4_63', '17_62', '47_64', '24_61', '23_43']
	}
};

export const gates: GateRecord<{
	name: string;
	paired: GateNumber[];
	channels: ChannelName[];
	center: CenterName;
}> = {
	'1': {
		name: 'Self-Expression',
		paired: ['8'],
		channels: ['1_8'],
		center: 'g'
	},

	'2': {
		name: 'Higher Knowing',
		paired: ['14'],
		channels: ['2_14'],
		center: 'g'
	},

	'3': {
		name: 'Ordering',
		paired: ['60'],
		channels: ['3_60'],
		center: 'sacral'
	},

	'4': {
		name: 'Formulization',
		paired: ['63'],
		channels: ['4_63'],
		center: 'ajna'
	},

	'5': {
		name: 'Universal Love',
		paired: ['15'],
		channels: ['5_15'],
		center: 'sacral'
	},

	'6': {
		name: 'Friction',
		paired: ['59'],
		channels: ['6_59'],
		center: 'esp'
	},

	'7': {
		name: 'Self Direction',
		paired: ['31'],
		channels: ['7_31'],
		center: 'g'
	},

	'8': {
		name: 'Holding Together',
		paired: ['1'],
		channels: ['1_8'],
		center: 'throat'
	},

	'9': {
		name: 'Focus',
		paired: ['52'],
		channels: ['9_52'],
		center: 'sacral'
	},

	'10': {
		name: 'Behavior',
		paired: ['34', '20', '57'],
		channels: ['10_34', '10_57', '10_20'],
		center: 'g'
	},

	'11': {
		name: 'Ideas',
		paired: ['56'],
		channels: ['11_56'],
		center: 'ajna'
	},

	'12': {
		name: 'Caution',
		paired: ['22'],
		channels: ['12_22'],
		center: 'throat'
	},

	'13': {
		name: 'Listening',
		paired: ['33'],
		channels: ['13_33'],
		center: 'g'
	},

	'14': {
		name: 'Power Skills',
		paired: ['2'],
		channels: ['2_14'],
		center: 'sacral'
	},

	'15': {
		name: 'Extremes',
		paired: ['5'],
		channels: ['5_15'],
		center: 'g'
	},

	'16': {
		name: 'Enthusiasm',
		paired: ['48'],
		channels: ['16_48'],
		center: 'throat'
	},

	'17': {
		name: 'Following',
		paired: ['62'],
		channels: ['17_62'],
		center: 'ajna'
	},

	'18': {
		name: 'Correction',
		paired: ['58'],
		channels: ['18_58'],
		center: 'spleen'
	},

	'19': {
		name: 'Approach',
		paired: ['49'],
		channels: ['19_49'],
		center: 'root'
	},

	'20': {
		name: 'Contemplation',
		paired: ['10', '57', '34'],
		channels: ['20_57', '20_34', '10_20'],
		center: 'throat'
	},

	'21': {
		name: 'Biting Through',
		paired: ['45'],
		channels: ['21_45'],
		center: 'will'
	},

	'22': {
		name: 'Grace',
		paired: ['12'],
		channels: ['12_22'],
		center: 'esp'
	},

	'23': {
		name: 'Splitting Apart',
		paired: ['43'],
		channels: ['23_43'],
		center: 'throat'
	},

	'24': {
		name: 'Assimilation',
		paired: ['61'],
		channels: ['24_61'],
		center: 'ajna'
	},

	'25': {
		name: 'Innocence',
		paired: ['51'],
		channels: ['25_51'],
		center: 'g'
	},

	'26': {
		name: 'Surrender',
		paired: ['44'],
		channels: ['26_44'],
		center: 'will'
	},

	'27': {
		name: 'Nourishment',
		paired: ['50'],
		channels: ['27_50'],
		center: 'sacral'
	},

	'28': {
		name: 'The Great',
		paired: ['38'],
		channels: ['28_38'],
		center: 'spleen'
	},

	'29': {
		name: 'The Small',
		paired: ['46'],
		channels: ['29_46'],
		center: 'sacral'
	},

	'30': {
		name: 'Vigilance',
		paired: ['41'],
		channels: ['30_41'],
		center: 'esp'
	},

	'31': {
		name: 'Retreat',
		paired: ['7'],
		channels: ['7_31'],
		center: 'throat'
	},

	'32': {
		name: 'Recognition',
		paired: ['54'],
		channels: ['32_54'],
		center: 'spleen'
	},

	'33': {
		name: 'Duration',
		paired: ['13'],
		channels: ['13_33'],
		center: 'throat'
	},

	'34': {
		name: 'The Abyss',
		paired: ['10', '20', '57'],
		channels: ['10_34', '34_57', '20_34'],
		center: 'sacral'
	},

	'35': {
		name: 'Progress',
		paired: ['36'],
		channels: ['35_36'],
		center: 'throat'
	},

	'36': {
		name: 'Easy Progress',
		paired: ['35'],
		channels: ['35_36'],
		center: 'esp'
	},

	'37': {
		name: 'Brightness Hiding',
		paired: ['40'],
		channels: ['37_40'],
		center: 'esp'
	},

	'38': {
		name: 'The Family',
		paired: ['28'],
		channels: ['28_38'],
		center: 'root'
	},

	'39': {
		name: 'Opposition',
		paired: ['55'],
		channels: ['39_55'],
		center: 'root'
	},

	'40': {
		name: 'Obstruction',
		paired: ['37'],
		channels: ['37_40'],
		center: 'will'
	},

	'41': {
		name: 'Deliverance',
		paired: ['30'],
		channels: ['30_41'],
		center: 'root'
	},

	'42': {
		name: 'Decrease',
		paired: ['53'],
		channels: ['42_53'],
		center: 'sacral'
	},

	'43': {
		name: 'Increase',
		paired: ['23'],
		channels: ['23_43'],
		center: 'ajna'
	},

	'44': {
		name: 'Breakthrough',
		paired: ['26'],
		channels: ['26_44'],
		center: 'spleen'
	},

	'45': {
		name: 'Meeting',
		paired: ['21'],
		channels: ['21_45'],
		center: 'throat'
	},

	'46': {
		name: 'Gathering',
		paired: ['29'],
		channels: ['29_46'],
		center: 'g'
	},

	'47': {
		name: 'Pushing Upward',
		paired: ['64'],
		channels: ['47_64'],
		center: 'ajna'
	},

	'48': {
		name: 'Limitation',
		paired: ['16'],
		channels: ['16_48'],
		center: 'spleen'
	},

	'49': {
		name: 'The Well',
		paired: ['19'],
		channels: ['19_49'],
		center: 'esp'
	},

	'50': {
		name: 'Revolution',
		paired: ['27'],
		channels: ['27_50'],
		center: 'spleen'
	},

	'51': {
		name: 'The Caldron',
		paired: ['25'],
		channels: ['25_51'],
		center: 'will'
	},

	'52': {
		name: 'Thunder',
		paired: ['9'],
		channels: ['9_52'],
		center: 'root'
	},

	'53': {
		name: 'Stillness',
		paired: ['42'],
		channels: ['42_53'],
		center: 'root'
	},

	'54': {
		name: 'Cyclic Beginnings',
		paired: ['32'],
		channels: ['32_54'],
		center: 'root'
	},

	'55': {
		name: 'Youthful Folly',
		paired: ['39'],
		channels: ['39_55'],
		center: 'esp'
	},

	'56': {
		name: 'Abundance',
		paired: ['11'],
		channels: ['11_56'],
		center: 'throat'
	},

	'57': {
		name: 'The Wanderer',
		paired: ['34', '20', '10'],
		channels: ['20_57', '10_57', '34_57'],
		center: 'spleen'
	},

	'58': {
		name: 'The Gentle Wind',
		paired: ['18'],
		channels: ['18_58'],
		center: 'root'
	},

	'59': {
		name: 'The Joyous Lake',
		paired: ['6'],
		channels: ['6_59'],
		center: 'sacral'
	},

	'60': {
		name: 'Dispersion',
		paired: ['3'],
		channels: ['3_60'],
		center: 'root'
	},

	'61': {
		name: 'Limitation',
		paired: ['24'],
		channels: ['24_61'],
		center: 'head'
	},

	'62': {
		name: 'Inner Truth',
		paired: ['17'],
		channels: ['17_62'],
		center: 'throat'
	},

	'63': {
		name: 'After Completion',
		paired: ['4'],
		channels: ['4_63'],
		center: 'head'
	},

	'64': {
		name: 'Harmony',
		paired: ['47'],
		channels: ['47_64'],
		center: 'head'
	}
};
