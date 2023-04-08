import type { GateNumber, GateRecord } from './gateNumber';
import type { Chart, PlanetData, Position } from './chart';

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

export const CENTER_GATES = {
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

export const channels: Record<string, { gates: GateNumber[]; centers: CenterName[] }> = {
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

export const chartLinkage = (charts: Chart[]) => {
	const _gates: Partial<Record<GateNumber, number[]>> = {};

	const addGate = ({ gate }: Position, idx: number) => {
		if (_gates[gate]) _gates[gate]?.push(idx);
		else _gates[gate] = [idx];
	};

	charts.forEach(({ tz, time, date, chiron, ...chart }) => Object.values(chart).forEach(addGate));

	const ch = Object.entries(channels)
		.filter(([_, { gates }]) => gates.every((gate) => gate in _gates))
		.map(([name, _]) => name) as ChannelName[];

	return {
		charts,
		channels: ch,
		gates: _gates
	};
};

export const findCenters = (ch: ChannelName[]) => {
	const centers = new Set<CenterName>();
	ch.forEach((channel) => channels[channel].centers.forEach((center) => centers.add(center)));
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

export const gates: GateRecord<{ name: string; paired: GateNumber[]; channels: ChannelName[] }> = {
	'1': {
		name: 'Self-Expression',
		paired: ['8'],
		channels: ['1_8']
	},

	'2': {
		name: 'Higher Knowing',
		paired: ['14'],
		channels: ['2_14']
	},

	'3': {
		name: 'Ordering',
		paired: ['60'],
		channels: ['3_60']
	},

	'4': {
		name: 'Formulization',
		paired: ['63'],
		channels: ['4_63']
	},

	'5': {
		name: 'Universal Love',
		paired: ['15'],
		channels: ['5_15']
	},

	'6': {
		name: 'Friction',
		paired: ['59'],
		channels: ['6_59']
	},

	'7': {
		name: 'Self Direction',
		paired: ['31'],
		channels: ['7_31']
	},

	'8': {
		name: 'Holding Together',
		paired: ['1'],
		channels: ['1_8']
	},

	'9': {
		name: 'Focus',
		paired: ['52'],
		channels: ['9_52']
	},

	'10': {
		name: 'Behavior',
		paired: ['34', '57', '20'],
		channels: ['10_20', '10_34', '10_57']
	},

	'11': {
		name: 'Ideas',
		paired: ['56'],
		channels: ['11_56']
	},

	'12': {
		name: 'Caution',
		paired: ['22'],
		channels: ['12_22']
	},

	'13': {
		name: 'Listening',
		paired: ['33'],
		channels: ['13_33']
	},

	'14': {
		name: 'Power Skills',
		paired: ['2'],
		channels: ['2_14']
	},

	'15': {
		name: 'Extremes',
		paired: ['5'],
		channels: ['5_15']
	},

	'16': {
		name: 'Enthusiasm',
		paired: ['48'],
		channels: ['16_48']
	},

	'17': {
		name: 'Following',
		paired: ['62'],
		channels: ['17_62']
	},

	'18': {
		name: 'Correction',
		paired: ['58'],
		channels: ['18_58']
	},

	'19': {
		name: 'Approach',
		paired: ['49'],
		channels: ['19_49']
	},

	'20': {
		name: 'Contemplation',
		paired: ['10', '34', '57'],
		channels: ['10_20', '20_34', '20_57']
	},

	'21': {
		name: 'Biting Through',
		paired: ['45'],
		channels: ['21_45']
	},

	'22': {
		name: 'Grace',
		paired: ['12'],
		channels: ['12_22']
	},

	'23': {
		name: 'Splitting Apart',
		paired: ['43'],
		channels: ['23_43']
	},

	'24': {
		name: 'Assimilation',
		paired: ['61'],
		channels: ['24_61']
	},

	'25': {
		name: 'Innocence',
		paired: ['51'],
		channels: ['25_51']
	},

	'26': {
		name: 'Surrender',
		paired: ['44'],
		channels: ['26_44']
	},

	'27': {
		name: 'Nourishment',
		paired: ['50'],
		channels: ['27_50']
	},

	'28': {
		name: 'The Great',
		paired: ['38'],
		channels: ['28_38']
	},

	'29': {
		name: 'The Small',
		paired: ['46'],
		channels: ['29_46']
	},

	'30': {
		name: 'Vigilance',
		paired: ['41'],
		channels: ['30_41']
	},

	'31': {
		name: 'Retreat',
		paired: ['7'],
		channels: ['7_31']
	},

	'32': {
		name: 'Recognition',
		paired: ['54'],
		channels: ['32_54']
	},

	'33': {
		name: 'Duration',
		paired: ['13'],
		channels: ['13_33']
	},

	'34': {
		name: 'The Abyss',
		paired: ['20', '57', '10'],
		channels: ['10_34', '34_57', '20_34']
	},

	'35': {
		name: 'Progress',
		paired: ['36'],
		channels: ['35_36']
	},

	'36': {
		name: 'Easy Progress',
		paired: ['35'],
		channels: ['35_36']
	},

	'37': {
		name: 'Brightness Hiding',
		paired: ['40'],
		channels: ['37_40']
	},

	'38': {
		name: 'The Family',
		paired: ['28'],
		channels: ['28_38']
	},

	'39': {
		name: 'Opposition',
		paired: ['55'],
		channels: ['39_55']
	},

	'40': {
		name: 'Obstruction',
		paired: ['37'],
		channels: ['37_40']
	},

	'41': {
		name: 'Deliverance',
		paired: ['30'],
		channels: ['30_41']
	},

	'42': {
		name: 'Decrease',
		paired: ['53'],
		channels: ['42_53']
	},

	'43': {
		name: 'Increase',
		paired: ['23'],
		channels: ['23_43']
	},

	'44': {
		name: 'Breakthrough',
		paired: ['26'],
		channels: ['26_44']
	},

	'45': {
		name: 'Meeting',
		paired: ['21'],
		channels: ['21_45']
	},

	'46': {
		name: 'Gathering',
		paired: ['29'],
		channels: ['29_46']
	},

	'47': {
		name: 'Pushing Upward',
		paired: ['64'],
		channels: ['47_64']
	},

	'48': {
		name: 'Limitation',
		paired: ['16'],
		channels: ['16_48']
	},

	'49': {
		name: 'The Well',
		paired: ['19'],
		channels: ['19_49']
	},

	'50': {
		name: 'Revolution',
		paired: ['27'],
		channels: ['27_50']
	},

	'51': {
		name: 'The Caldron',
		paired: ['25'],
		channels: ['25_51']
	},

	'52': {
		name: 'Thunder',
		paired: ['9'],
		channels: ['9_52']
	},

	'53': {
		name: 'Stillness',
		paired: ['42'],
		channels: ['42_53']
	},

	'54': {
		name: 'Cyclic Beginnings',
		paired: ['32'],
		channels: ['32_54']
	},

	'55': {
		name: 'Youthful Folly',
		paired: ['39'],
		channels: ['39_55']
	},

	'56': {
		name: 'Abundance',
		paired: ['11'],
		channels: ['11_56']
	},

	'57': {
		name: 'The Wanderer',
		paired: ['10', '34', '20'],
		channels: ['34_57', '20_57', '10_57']
	},

	'58': {
		name: 'The Gentle Wind',
		paired: ['18'],
		channels: ['18_58']
	},

	'59': {
		name: 'The Joyous Lake',
		paired: ['6'],
		channels: ['6_59']
	},

	'60': {
		name: 'Dispersion',
		paired: ['3'],
		channels: ['3_60']
	},

	'61': {
		name: 'Limitation',
		paired: ['24'],
		channels: ['24_61']
	},

	'62': {
		name: 'Inner Truth',
		paired: ['17'],
		channels: ['17_62']
	},

	'63': {
		name: 'After Completion',
		paired: ['4'],
		channels: ['4_63']
	},

	'64': {
		name: 'Harmony',
		paired: ['47'],
		channels: ['47_64']
	}
};
