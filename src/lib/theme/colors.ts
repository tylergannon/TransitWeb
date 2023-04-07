import type { CenterRecord } from '$lib/hd/graph';

const makeColors = (args: CenterRecord<string>) => args;

export default makeColors({
	ajna: '#f0f',
	esp: '#0ff',
	g: '#f00',
	head: '#f0f',
	root: '#0f0',
	sacral: '#ff0',
	spleen: '#0ff',
	throat: '#f00',
	will: '#0f0'
});
