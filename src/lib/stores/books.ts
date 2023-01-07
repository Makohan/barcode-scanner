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
				books.save();
			}
		},
		delete: (isbn: string) => {
			const currentBooks = get(books);
			set(currentBooks.filter((b) => b.isbn !== isbn));
		},
		deleteAll: () => {
			set([]);
			books.save();
		},
		save: () => {
			localStorage.setItem('books', JSON.stringify(get(books)));
		},
		load: () => {
			set(JSON.parse(localStorage.getItem('books') || '[]'));
		}
	};
};

export const books = createStore();
