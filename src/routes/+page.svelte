<script lang="ts">
	import BookList from '$lib/components/BookList.svelte';
	import ButtonCsvDownload from '$lib/components/ButtonCsvDownload.svelte';
	import ButtonResetBooks from '$lib/components/ButtonResetBooks.svelte';
	import Scanner from '$lib/components/Scanner.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let loading = true;
</script>

<svelte:head>
	<title>バーコードリーダー</title>
</svelte:head>

<section>
	<Scanner
		on:scannerStart={() => {
			loading = false;
		}}
	/>
	{#if loading}
		<Spinner />
	{:else}
		<div class="mt-4 px-2">
			<div>
				<ButtonCsvDownload />
				<ButtonResetBooks />
			</div>
			<div class="mt-4">
				<BookList />
			</div>
		</div>
	{/if}
</section>
