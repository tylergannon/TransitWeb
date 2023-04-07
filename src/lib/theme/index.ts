import type { GateArgs, GatesConf } from './gates';
import type { BodyGraphProps, CenterRecord } from '$lib/hd/graph';
import type { CenterProps } from './centers';
import type { ChannelConf } from './channels';

export type { GateArgs, GatesConf, BodyGraphProps, CenterRecord, CenterProps, ChannelConf };

import gates from './gates';
import centers from './centers';
import channels from './channels';
import props from './props';
import colors from './colors';

export interface GraphTheme {
	gates: GatesConf<GateArgs>;
	centers: CenterRecord<CenterProps>;
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
