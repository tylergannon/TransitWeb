import type { GateArgs, PipProps } from './gates';
import type { CenterRecord } from '$lib/hd';
import type { CenterDisplayProps, CenterProps } from './centers';
import type { ChannelConf } from './channels';
import type { BodyGraphProps } from './types';

export type {
	GateArgs,
	BodyGraphProps,
	CenterRecord,
	CenterProps,
	ChannelConf,
	CenterDisplayProps,
	PipProps
};

import gates from './gates';
import centers from './centers';
import channels from './channels';
import props from './props';
import colors from './colors';
import type { GateRecord } from '$lib/hd/gateNumber';

export interface GraphTheme {
	gates: GateRecord<PipProps>;
	centers: CenterRecord<CenterDisplayProps>;
	props: BodyGraphProps;
	channels: ChannelConf[];
	colors: CenterRecord<string>;
}

export const theme: GraphTheme = {
	gates,
	centers,
	props,
	channels,
	colors
};

export default theme;
