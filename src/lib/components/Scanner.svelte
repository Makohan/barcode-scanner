<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Quagga from '@ericblade/quagga2';
	import { books } from '$lib/stores/books';
	import { fade } from 'svelte/transition';
	import { bookApi } from '$lib/api/googleapisBooks';

	$: console.log($books);

	let audioOk: HTMLAudioElement;
	let audioError: HTMLAudioElement;

	let showLeadMessage = false;

	// API大量アクセス防止
	let fetching = false;

	const addAndSearch = async (isbn: string) => {
		if (fetching || books.includes(isbn)) return;

		fetching = true;

		dispatch('addAndSearch', { isbn });

		setTimeout(() => {
			fetching = false;
		}, 2000);
	};

	const dispatch = createEventDispatcher();

	onMount(() => {
		Quagga.init(
			{
				inputStream: {
					type: 'LiveStream',
					target: document.querySelector('#container') ?? undefined,
					constraints: {
						latency: 500,
						width: Math.min(innerWidth, 760),
						facingMode: 'environment'
					}
				},
				decoder: {
					readers: ['ean_reader']
				}
			},
			function (err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('Initialization finished. Ready to start');
				Quagga.start();

				dispatch('scannerStart');

				showLeadMessage = true;
				setTimeout(() => {
					showLeadMessage = false;
				}, 5000);
			}
		);

		Quagga.onProcessed(function (result) {
			const ctx = Quagga.canvas.ctx.overlay;
			const canvas = Quagga.canvas.dom.overlay;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (result && result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, {
					color: 'green',
					lineWidth: 6
				});
			}
		});

		Quagga.onDetected(function (result) {
			const barcode = result.codeResult.code;
			// ISBNでなければ処理終了
			if (barcode?.slice(0, 2) != '97') return;

			addAndSearch(barcode);
		});
	});

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<audio bind:this={audioOk}>
	<source src="./audio/ok.mp3" type="audio/mp3" />
</audio>

<audio bind:this={audioError}>
	<source src="./audio/error.mp3" type="audio/mp3" />
</audio>

<div id="container" class="relative">
	{#if showLeadMessage}
		<p
			transition:fade
			class="absolute w-fit bottom-8 left-0 right-0 mx-auto bg-green-400 opacity-75 text-center p-2 rounded-lg"
		>
			本のバーコードをスキャンしてください
		</p>
	{/if}
</div>

<style>
	:global(div > video) {
		display: block;
		top: 0;
		left: 0;
	}
	:global(.drawingBuffer) {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
