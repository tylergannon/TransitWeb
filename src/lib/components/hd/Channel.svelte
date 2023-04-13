<script lang="ts">
	import type { GateNumber } from '$lib/hd';
	import type { Linkage, _GateConf } from '$lib/hd/graph';
	import type { Readable } from 'svelte/store';
	import type { GraphTheme } from '$lib/theme';
	import { getContext } from 'svelte';

	const theme: Readable<GraphTheme> = getContext('theme') as Readable<GraphTheme>;
	const linkage: Readable<Linkage> = getContext('linkage') as Readable<Linkage>;

	export let gate: GateNumber;
	$: myChannel = $theme.channelForGate[gate];

	$: ({ dash } = $theme.channels[myChannel]);
	$: rev = $theme.channels[myChannel].to === gate;
	$: [sources, channels, colors] = $linkage.gates[gate] || ([[], [], []] as _GateConf);
</script>

{#if sources.length > 0}
	<g style:--ctr={dash} class:rev>
		<use stroke-dashoffset={rev ? -dash : 0} id="ch-{gate}" href="#path-{myChannel}" stroke={colors[0]} class="path" />

		{#if sources.length === 2}
			<use
				id="ch-{gate}-2"
        stroke-dashoffset={rev ? -dash : 0}
				href="#path-{myChannel}"
				stroke={colors[1]}
				class="path"
				clip-path="url(#inner-{myChannel})"
			/>
		{/if}
	</g>
{/if}

<style lang="postcss">
	use.path {
		fill: none;
		stroke-dasharray: var(--ctr), 1000000;
		stroke-width: var(--channel-width);
		z-index: 1;
	}

	g.rev use.path {
		stroke-dasharray: 1000000, 1000000;
	}
</style>
