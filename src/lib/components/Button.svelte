<script lang="ts">
	export let disabled = false;
</script>

<button
	type="button"
	on:click
	class="border p-2 min-w-fit rounded hover:bg-gray-100 disabled:hover:bg-white disabled:text-gray-300"
	{disabled}><slot /></button
>
