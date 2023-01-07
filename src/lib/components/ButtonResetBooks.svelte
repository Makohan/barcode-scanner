<script lang="ts">
	import { books } from '$lib/stores/books';
	import Button from './Button.svelte';

	const save = () => {
		if (confirm('読み込んだ本をリセットしますか？')) {
			books.deleteAll();
		}
	};
</script>

<Button on:click={save} disabled={$books.length === 0}>リセット</Button>
