<script lang="ts">
	import { books } from '$lib/stores/books';
	import Book from './Book.svelte';
	import { flip } from 'svelte/animate';

	// スキャンしたものが最初にくるようにして目視確認しやすくする
	$: displayBooks = [...$books].reverse();
</script>

<section>
	{#each displayBooks as book (book.isbn)}
		<div animate:flip={{ duration: 600 }}>
			<Book {book} />
		</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		justify-items: center;
	}

	div {
		margin: 0 10px 10px 0;
	}
</style>
