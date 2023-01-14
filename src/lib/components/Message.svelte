<script lang="ts">
	import { messages } from '$lib/stores/message';
	import { fly } from 'svelte/transition';
</script>

<div class="absolute z-auto w-fit">
	<ul>
		{#each $messages as message (message.id)}
			<li
				in:fly={{ y: -50 }}
				out:fly={{ y: -50 }}
				class="{message.type === 'success' ? 'bg-green-300' : 'bg-red-300'} p-2.5 opacity-75"
			>
				{message.text}
			</li>
		{/each}
	</ul>
</div>
