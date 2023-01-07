<script lang="ts">
	import { books } from '$lib/stores/books';
	import Book from './Book.svelte';
	import { flip } from 'svelte/animate';
	import BookDeletable from './BookDeletable.svelte';

	// スキャンしたものが最初にくるようにして目視確認しやすくする
	$: displayBooks = [...$books].reverse();
</script>

<section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-fit gap-4">
	{#each displayBooks as book (book.isbn)}
		<div animate:flip={{ duration: 600 }}>
			<BookDeletable isbn={book.isbn}>
				<Book {book} />
			</BookDeletable>
		</div>
	{/each}
</section>
