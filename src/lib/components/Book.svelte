<script lang="ts">
	import type { Book } from '$lib/stores/books';

	export let book: Book;

	const DUMMY_IMG = 'https://dummyimage.com/128x181/fff/000&text=No+Image';
</script>

<div class="text-xs">
	<img src={book.thumbnailUrl || DUMMY_IMG} alt={book.title} />
	<div class="mt-2">
		<p>{book.isbn}</p>
		<p>{book.title || '(不明)'}</p>
		<p>{book.publishedDate || '(不明)'}</p>
	</div>
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
