<script>
	import {dndzone} from 'svelte-dnd-action';
	import {flip} from 'svelte/animate';
	const flipDurationMs = 200;
	
	export let items = [];
	
	function handleSort(e) {
		items = e.detail.items;
	}
</script>
<section use:dndzone={{items, flipDurationMs}} on:consider={handleSort} on:finalize={handleSort} style="height: 80vh" class="overflow-auto">
	{#each items as item(item.rank)}
		<div style="color: white" animate:flip={{duration:flipDurationMs}}>
			{item.team_key}
		</div>
	{/each}
</section>