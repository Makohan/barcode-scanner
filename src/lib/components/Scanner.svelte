<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Quagga from '@ericblade/quagga2';
	import { books } from '$lib/stores/books';
	import Audio, { playAudioError, playAudioOk } from './Audio.svelte';
	import { messages } from '$lib/stores/message';

	$: console.log($books);

	// API大量アクセス防止
	let fetching = false;

	const scan = async (isbn: string) => {
		// 連続して処理しないように一定時間処理しない
		setTimeout(() => {
			fetching = false;
		}, 2000);

		if (fetching) return;

		fetching = true;

		if (books.includes(isbn)) {
			playAudioError();
			messages.add({ text: '既にスキャン済みの本です。', type: 'error' });
			return;
		}

		playAudioOk();

		dispatch('scan', { isbn });
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

				messages.add({ text: '本のバーコードをスキャンしてください' });
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

			scan(barcode);
		});
	});

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div id="container" class="relative" />
<Audio />

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
