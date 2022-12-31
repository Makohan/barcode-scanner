<script lang="ts">
	import BookList from '$lib/components/BookList.svelte';
	import CsvDownloadButton from '$lib/components/CsvDownloadButton.svelte';
	import Scanner from '$lib/components/Scanner.svelte';
</script>

<svelte:head>
	<title>バーコードリーダー</title>
</svelte:head>

<section>
	<Scanner />
	<div class="px-2">
		<CsvDownloadButton />
		<div class="mt-4">
			<BookList />
		</div>
	</div>
</section>
