<script lang="ts">
	import { books } from '$lib/stores/books';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	let isbn = '';

	const dispatch = createEventDispatcher();

	const addAndSearch = () => {
		dispatch('addAndSearch', { isbn });
	};

	// 本が追加されたらリセットする
	books.subscribe((currentBooks) => {
		const numIsbn = isbn.replace(/[^0-9]/g, '');
		if (currentBooks.some((b) => b.isbn === numIsbn)) {
			isbn = '';
		}
	});
</script>

<div class="flex items-center">
	<label for="isbn" class="whitespace-nowrap w-fit text-sm font-medium text-gray-900"
		>ISBN（手動）</label
	>
	<input
		type="text"
		id="isbn"
		bind:value={isbn}
		class="mr-2 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full"
		placeholder="97xxxxxxxxxxx（13桁）"
	/>
	<Button on:click={addAndSearch}>検索</Button>
</div>
