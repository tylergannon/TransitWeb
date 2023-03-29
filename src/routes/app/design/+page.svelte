<script lang="ts">
	/**
	 * A chart is a representation of one or more planetary snapshots.
	 * I'll call the snapshots "constituents".
	 * Each constituent chart is a snapshot of the sky at a particular time.
	 * Either for a so-called "transit" or else
	 * the design or personality aspects of an individual's human design.
	 * Therefore each Gate store should know:
	 * - Where it is located in the diagram
	 * - Its own gate number
	 * - Which of the constituents causes the activation
	 * - Whether or not to display, and how.
	 *
	 * For now I think we should focus on location, display.
	 *
	 * Centers should be the default size if their size is not set.
	 * Two levels of stores -- ones that are interacted with, and then derived
	 * ones that compose various settable values into a single Readable interface.
	*/

	import Graph from "$lib/components/hd/Graph.svelte"

	let height = 800;
	let width = 800;

</script>

<div>
	Design
	<Graph />
</div>
