<script lang="ts">
	export let disabled = false;
	export let color: undefined | 'red' | 'blue' = undefined;

	const red = color === 'red'
	const blue = color === 'blue'
</script>

<button
	type="button"
	on:click
	class="border p-2 min-w-fit rounded hover:opacity-80 disabled:hover:cursor-not-allowed disabled:hover:opacity-100 disabled:text-white disabled:bg-gray-400"
	class:bg-rose-500={!disabled && red}
	class:bg-indigo-500={!disabled && blue}
	class:text-white={red || blue}
	{disabled}><slot /></button
>
