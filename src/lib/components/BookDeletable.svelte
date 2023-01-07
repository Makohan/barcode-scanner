<script lang="ts">
	import { books } from '$lib/stores/books';

	export let isbn: string;
</script>

<div>
	<slot />
	<button
		type="button"
		class="right-1 top-1 bg-white text-black rounded py-1 px-2 text-xs border"
		on:click={() => books.delete(isbn)}>削除</button
	>
</div>
