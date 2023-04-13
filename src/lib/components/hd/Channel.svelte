<script lang="ts">
	import type { GateNumber, PlanetName } from '$lib/hd';
	import type { ChannelName, Linkage, _GateConf } from '$lib/hd/graph';
	import allChannels, { channelForGate } from '$lib/theme/channels';

	export let gate: GateNumber;

	$: dispChannel = channelForGate[gate];

	export let dash: number;
  export let sources: [PlanetName, number][];
  export let channels: ChannelName[];
  export let colors: string[];

	$: rev = allChannels[dispChannel].to === gate;
</script>

{#if sources.length > 0}
	<g style:--ctr={dash} class:rev>
		<use
			stroke-dashoffset={rev ? -dash : 0}
			id="ch-{gate}"
			href="#path-{dispChannel}"
			class="path {colors[0]}"
		/>

		{#if sources.length === 2}
			<use
				id="ch-{gate}-2"
				stroke-dashoffset={rev ? -dash : 0}
				href="#path-{dispChannel}"
				class="path {colors[1]}"
				clip-path="url(#inner-{dispChannel})"
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
