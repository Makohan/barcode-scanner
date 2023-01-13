<script lang="ts">
	import { bookApi } from '$lib/api/googleapisBooks';
	import BookList from '$lib/components/BookList.svelte';
	import ButtonCsvDownload from '$lib/components/ButtonCsvDownload.svelte';
	import ButtonResetBooks from '$lib/components/ButtonResetBooks.svelte';
	import InputIsbn from '$lib/components/InputIsbn.svelte';
	import Scanner from '$lib/components/Scanner.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { books } from '$lib/stores/books';

	let loading = true;

	const addAndSearch = async (event: CustomEvent) => {
		try {
			const isbn = event.detail.isbn.replace(/[^0-9]/g, '');
			const book = await bookApi(isbn);

			books.add({
				isbn,
				title: book?.volumeInfo?.title,
				subtitle: book?.volumeInfo?.subtitle,
				author: book?.volumeInfo?.authors?.join(', '),
				description: book?.volumeInfo?.description,
				thumbnailUrl: book?.volumeInfo?.imageLinks?.thumbnail,
				publishedDate: book?.volumeInfo?.publishedDate
			});
		} catch (error) {
			console.log(error);
		}
	};
</script>

<svelte:head>
	<title>バーコードリーダー</title>
</svelte:head>

<section>
	<Scanner
		on:scannerStart={() => {
			loading = false;
		}}
		on:addAndSearch={addAndSearch}
	/>
	{#if loading}
		<Spinner />
	{:else}
		<div class="mt-4 px-2">
			<div class="flex gap-2 items-center">
				<ButtonCsvDownload />
				<ButtonResetBooks />
				<div class="ml-4">
					<InputIsbn on:addAndSearch={addAndSearch} />
				</div>
			</div>
			<div class="mt-4">
				<BookList />
			</div>
		</div>
	{/if}
</section>
