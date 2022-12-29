import { get, writable } from 'svelte/store';

export type Book = {
	isbn: string;
	title: string;
	subtitle: string;
	author: string;
	description: string;
	thumbnailUrl: string;
	publishedDate: string;
};

const createStore = () => {
	const { subscribe, set } = writable<Book[]>([]);

	return {
		subscribe,
		includes: (isbn: string) => get(books).some((b) => b.isbn === isbn),
		add: (book: Book) => {
			const currentBooks = get(books);
			if (!currentBooks.some((b) => b.isbn === book.isbn)) {
				set([...currentBooks, book]);
			}
		}
	};
};

export const books = createStore();
