<script lang="ts">
	import type { Book } from '$lib/stores/books';

	export let book: Book;
</script>

<div>
	<p>{book.isbn}</p>
	<p>{book.title || '(不明)'}</p>
	<p>{book.publishedDate || '(不明)'}</p>
	<img src={book.thumbnailUrl} alt={book.title} />
</div>

<style>
	div {
		width: 128px;
	}

	p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	img {
		max-width: 100%;
		box-shadow: 0 4px 6px -1px;
	}
</style>
