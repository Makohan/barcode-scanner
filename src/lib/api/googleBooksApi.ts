export const googleBooksApi = async (isbn: string) => {
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);

	if (!res.ok || res.status !== 200) {
		throw new Error('api error');
	}

	const parsed: Root = await res.json();

	return parsed.items ? parsed.items[0] : null;
};

interface Root {
	kind: string;
	totalItems: number;
	items: GoogleBook[];
}

export interface GoogleBook {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: VolumeInfo;
	saleInfo: SaleInfo;
	accessInfo: AccessInfo;
	searchInfo: SearchInfo;
}

interface VolumeInfo {
	title: string;
	subtitle: string;
	authors: string[];
	publishedDate: string;
	description: string;
	industryIdentifiers: IndustryIdentifier[];
	readingModes: ReadingModes;
	pageCount: number;
	printType: string;
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary: PanelizationSummary;
	imageLinks: ImageLinks;
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
}

interface IndustryIdentifier {
	type: string;
	identifier: string;
}

interface ReadingModes {
	text: boolean;
	image: boolean;
}

interface PanelizationSummary {
	containsEpubBubbles: boolean;
	containsImageBubbles: boolean;
}

interface ImageLinks {
	smallThumbnail: string;
	thumbnail: string;
}

interface SaleInfo {
	country: string;
	saleability: string;
	isEbook: boolean;
}

interface AccessInfo {
	country: string;
	viewability: string;
	embeddable: boolean;
	publicDomain: boolean;
	textToSpeechPermission: string;
	epub: Epub;
	pdf: Pdf;
	webReaderLink: string;
	accessViewStatus: string;
	quoteSharingAllowed: boolean;
}

interface Epub {
	isAvailable: boolean;
}

interface Pdf {
	isAvailable: boolean;
}

interface SearchInfo {
	textSnippet: string;
}
