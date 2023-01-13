export const bookApi = async (isbn: string) => {
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);

	if (!res.ok || res.status !== 200) {
		throw new Error('api error');
	}

	const parsed = await res.json();

	return parsed.items ? parsed.items[0] : null;
};
