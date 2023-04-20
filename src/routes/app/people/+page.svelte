<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const showSidebar: Readable<boolean> = getContext('showSidebar');
	$showSidebar = true;
</script>

<h1>Sick</h1>
