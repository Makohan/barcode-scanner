<script>
	import Footer from '$lib/components/Footer.svelte';
	import './styles.css';
</script>

<div class="min-h-screen">
	<main class="w-full">
		<slot />
	</main>

	<div class="mt-8">
		<Footer />
	</div>
</div>
