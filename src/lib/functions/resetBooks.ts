import { books } from '$lib/stores/books';

export const resetBooks = () => {
	if (confirm('読み込んだ本をリセットしますか？')) {
		books.deleteAll();
	}
};
