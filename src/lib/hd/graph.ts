export interface TriangleCenterProps {
	size: number;
	height: number;
	halfHeight: number;
}

export interface BodyGraphProps {
	height: number;
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
	x: number;
	y: number;
	radius: number;
}

export interface CenterArgs {
	x: number;
	y: number;
	scale: number;
	size?: number;
}
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

export function mapCenterRecord<T, U>(
	fn: ({ center, name }: { center: T; name: string }) => U,
	record: CenterRecord<T>
): CenterRecord<U> {
	return {
		head: fn({ center: record.head, name: 'head' }),
		ajna: fn({ center: record.ajna, name: 'ajna' }),
		throat: fn({ center: record.throat, name: 'throat' }),
		g: fn({ center: record.g, name: 'g' }),
		sacral: fn({ center: record.sacral, name: 'sacral' }),
		root: fn({ center: record.root, name: 'root' }),
		will: fn({ center: record.will, name: 'will' }),
		spleen: fn({ center: record.spleen, name: 'spleen' }),
		esp: fn({ center: record.esp, name: 'esp' })
	};
}

export const pipProps = (
	props: CenterDisplayProps,
	x: (props: CenterDisplayProps) => number,
	y: (props: CenterDisplayProps) => number
): PipProps => ({
	x: x(props),
	y: y(props),
	radius: props.pipRadius
});

const CENTER_GATES = {
	head: ['64', '61', '63'] as const,
	ajna: ['47', '24', '4', '17', '43', '11'] as const,
	throat: ['62', '23', '56', '35', '12', '45', '33', '8', '31', '20', '16'] as const,
	g: ['7', '1', '13', '10', '25', '15', '46', '2'] as const,
	sacral: ['5', '14', '29', '59', '9', '3', '42', '27', '34'] as const,
	root: ['58', '38', '54', '53', '60', '52', '9', '39', '41'] as const,
	will: ['26', '51', '21', '40'] as const,
	spleen: ['48', '57', '44', '50', '32', '28', '18'] as const,
	esp: ['36', '22', '37', '6', '49', '55', '30'] as const
} as const;