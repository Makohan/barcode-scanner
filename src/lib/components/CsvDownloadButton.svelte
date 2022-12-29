<script lang="ts">
	import { books } from '$lib/stores/books';

	function download() {
		//ダウンロードするCSVファイル名を指定する
		const filename = 'download.csv';
		//CSVデータ
		const title = [
			'isbn',
			'title',
			'subtitle',
			'author',
			'description',
			'thumbnailUrl',
			'publishedDate'
		];

		const data = [
			title.join(','),
			...$books.map((b) =>
				[
					b.isbn,
					b.title,
					'"' + b.subtitle + '"',
					'"' + b.author + '"',
					'"' + b.description + '"',
					b.thumbnailUrl,
					b.publishedDate
				].join(',')
			)
		].join('\n');
		//BOMを付与する（Excelでの文字化け対策）
		const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
		//Blobでデータを作成する
		const blob = new Blob([bom, data], { type: 'text/csv' });

		//IE10/11用(download属性が機能しないためmsSaveBlobを使用）
		if (window.navigator.msSaveBlob) {
			window.navigator.msSaveBlob(blob, filename);
			//その他ブラウザ
		} else {
			//BlobからオブジェクトURLを作成する
			const url = (window.URL || window.webkitURL).createObjectURL(blob);
			//ダウンロード用にリンクを作成する
			const download = document.createElement('a');
			//リンク先に上記で生成したURLを指定する
			download.href = url;
			//download属性にファイル名を指定する
			download.download = filename;
			//作成したリンクをクリックしてダウンロードを実行する
			download.click();
			//createObjectURLで作成したオブジェクトURLを開放する
			(window.URL || window.webkitURL).revokeObjectURL(url);
		}
	}
</script>

<button type="button" on:click={download}>CSVダウンロード</button>
