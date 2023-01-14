<script lang="ts">
	import { books } from '$lib/stores/books';
	import { messages } from '$lib/stores/message';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	let isbn = '';
	const ISBN_LENGTH = 13;

	const dispatch = createEventDispatcher();

	const click = () => {
		const numberIsbn = isbn.replace(/[^0-9]/g, '');
		if (numberIsbn.length !== ISBN_LENGTH) {
			messages.add({ text: `13桁の数字を入力してください。今は${numberIsbn.length}桁です。`, type: 'error' });
			return;
		}

		if (books.includes(isbn)) {
			messages.add({ text: '既にスキャン済みの本です。', type: 'error' });
			return;
		}

		dispatch('click', { isbn });
	};

	// 本が追加されたらリセットする
	books.subscribe(() => {
		if (books.includes(isbn)) isbn = '';
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
	<Button on:click={click}>検索</Button>
</div>
