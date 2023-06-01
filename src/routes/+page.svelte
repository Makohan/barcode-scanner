<script lang="ts">
	import BookList from '$lib/components/BookList.svelte';
	import Button from '$lib/components/Button.svelte';
	import InputIsbn from '$lib/components/InputIsbn.svelte';
	import Message from '$lib/components/Message.svelte';
	import Scanner from '$lib/components/Scanner.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { addAndSearch } from '$lib/functions/addAndSearch';
	import { csvDownload } from '$lib/functions/csvDownload';
	import { resetBooks } from '$lib/functions/resetBooks';
	import { books } from '$lib/stores/books';

	let loading = true;
</script>

<svelte:head>
	<title>バーコードリーダー</title>
</svelte:head>

<Message />

<section>
	<Scanner
		on:scannerStart={() => {
			loading = false;
		}}
		on:scan={addAndSearch}
	/>
	{#if loading}
		<Spinner />
	{:else}
		<div class="mt-4 px-2">
			<div class="flex gap-2 items-center">
				<InputIsbn on:click={addAndSearch} />
				<div class="ml-4">
					<Button on:click={() => csvDownload($books)} disabled={$books.length === 0} color="blue"
						>CSVダウンロード</Button
					>
					<Button on:click={() => resetBooks()} disabled={$books.length === 0} color="red">リセット</Button>
				</div>
			</div>
			<div class="mt-4">
				<BookList />
			</div>
		</div>
	{/if}
</section>
