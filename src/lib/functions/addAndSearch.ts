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
	const openBdBook = await openBdApi(isbn);

	if (openBdBook) {
		return {
			isbn,
			title: openBdBook?.onix?.DescriptiveDetail?.TitleDetail?.TitleElement?.TitleText?.content,
			subtitle: openBdBook?.onix?.DescriptiveDetail?.TitleDetail?.TitleElement?.Subtitle?.content,
			author: openBdBook?.summary?.author,
			description: openBdBook?.onix?.CollateralDetail?.TextContent?.map((c) => c?.Text).join(', '),
			thumbnailUrl: openBdBook?.summary?.cover,
			publishedDate: openBdBook?.summary?.pubdate,
			publisher: openBdBook?.summary.publisher
		};
	}

	const googleBook = await googleBooksApi(isbn);

	if (googleBook) {
		return {
			isbn,
			title: googleBook?.volumeInfo?.title,
			subtitle: googleBook?.volumeInfo?.subtitle,
			author: googleBook?.volumeInfo?.authors?.join(', '),
			description: googleBook?.volumeInfo?.description,
			thumbnailUrl: googleBook?.volumeInfo?.imageLinks?.thumbnail,
			publishedDate: googleBook?.volumeInfo?.publishedDate,
			publisher: ''
		};
	}

	return { isbn };
};
