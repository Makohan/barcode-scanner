import { bookApi } from '$lib/api/googleapisBooks';
import { books } from '$lib/stores/books';

export const addAndSearch = async (event: CustomEvent) => {
	try {
		const isbn = event.detail.isbn.replace(/[^0-9]/g, '');
		const book = await bookApi(isbn);

		books.add({
			isbn,
			title: book?.volumeInfo?.title,
			subtitle: book?.volumeInfo?.subtitle,
			author: book?.volumeInfo?.authors?.join(', '),
			description: book?.volumeInfo?.description,
			thumbnailUrl: book?.volumeInfo?.imageLinks?.thumbnail,
			publishedDate: book?.volumeInfo?.publishedDate
		});
	} catch (error) {
		console.log(error);
	}
};
