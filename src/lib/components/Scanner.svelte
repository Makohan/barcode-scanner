<script lang="ts">
	import { onMount } from 'svelte';
	import Quagga from 'quagga';
	import { books } from '$lib/stores/books';

	$: console.log($books);

	let audioOk: HTMLAudioElement;
	let audioError: HTMLAudioElement;

	// API大量アクセス防止
	let fetching = false;

	const addAndSearch = async (isbn: string) => {
		if (fetching) return;
		if (books.includes(isbn)) return;

		// 検索API
		try {
			fetching = true;

			const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(
				async (res) => {
					if (!res.ok || res.status !== 200) {
						audioError.play();
						alert('APIが失敗しました。');
						return;
					}

					audioOk.play();

					const parsed = await res.json();
					if (!parsed.items) {
						audioError.play();
						alert('本の情報を取得できませんでした。');
						return;
					}

					const book = parsed.items[0];
					console.log(book);

					books.add({
						isbn,
						title: book.volumeInfo.title,
						subtitle: book.volumeInfo.subtitle,
						author: book.volumeInfo.authors?.join(', '),
						description: book.volumeInfo.description,
						thumbnailUrl: book.volumeInfo.imageLinks?.thumbnail,
						publishedDate: book.volumeInfo.publishedDate
					});
				}
			);
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				fetching = false;
			}, 2000);
		}
	};

	onMount(() => {
		Quagga.init(
			{
				inputStream: {
					type: 'LiveStream',
					target: document.querySelector('#container'),
					constraints: {
						width: innerWidth
					}
				},
				constraints: {
					facingMode: 'environment'
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
			}
		);

		Quagga.onProcessed(function (result) {
			var ctx = Quagga.canvas.ctx.overlay;
			var canvas = Quagga.canvas.dom.overlay;

			ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));

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
			if (barcode.slice(0, 2) != '97') return;

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

<div id="container" />

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
