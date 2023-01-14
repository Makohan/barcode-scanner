<script lang="ts">
	import BookList from '$lib/components/BookList.svelte';
	import ButtonCsvDownload from '$lib/components/ButtonCsvDownload.svelte';
	import ButtonResetBooks from '$lib/components/ButtonResetBooks.svelte';
	import InputIsbn from '$lib/components/InputIsbn.svelte';
	import Message from '$lib/components/Message.svelte';
	import Scanner from '$lib/components/Scanner.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { addAndSearch } from '$lib/functions/addAndSearch';

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
				<ButtonCsvDownload />
				<ButtonResetBooks />
				<div class="ml-4">
					<InputIsbn on:click={addAndSearch} />
				</div>
			</div>
			<div class="mt-4">
				<BookList />
			</div>
		</div>
	{/if}
</section>
