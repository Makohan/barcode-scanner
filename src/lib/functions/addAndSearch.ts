import { googleBooksApi } from '$lib/api/googleBooksApi';
import { openBdApi } from '$lib/api/openBdApi';
import { books } from '$lib/stores/books';

export const addAndSearch = async (event: CustomEvent) => {
	try {
		const isbn = event.detail.isbn.replace(/[^0-9]/g, '');
		const book = await fetchBook(isbn);

		books.add(book);
	} catch (error) {
		console.log(error);
	}
};

const fetchBook = async (isbn: string) => {
	const res = await Promise.all([openBdApi(isbn), googleBooksApi(isbn)]);

	const openBdBook = res[0];
	const googleBook = res[1];

	const title = openBdBook
		? {
				title: openBdBook?.onix?.DescriptiveDetail?.TitleDetail?.TitleElement?.TitleText?.content,
				subtitle: openBdBook?.onix?.DescriptiveDetail?.TitleDetail?.TitleElement?.Subtitle?.content
		  }
		: {
				title: googleBook?.volumeInfo?.title,
				subtitle: googleBook?.volumeInfo?.subtitle
		  };

	return {
		isbn,
		...title,
		author: openBdBook?.summary?.author || googleBook?.volumeInfo?.authors?.join(' '),
		description:
			googleBook?.volumeInfo?.description ||
			openBdBook?.onix?.CollateralDetail?.TextContent?.map((c) => c?.Text).join('\n'),
		thumbnailUrl: openBdBook?.summary?.cover || googleBook?.volumeInfo?.imageLinks?.thumbnail,
		publishedDate: openBdBook?.summary?.pubdate || googleBook?.volumeInfo?.publishedDate,
		publisher: openBdBook?.summary.publisher
	};
};
