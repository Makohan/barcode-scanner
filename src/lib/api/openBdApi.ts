export const openBdApi = async (isbn: string) => {
	const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`);

	if (!res.ok || res.status !== 200) {
		throw new Error('api error');
	}

	const parsed: Root = await res.json();

	return parsed.length ? parsed[0] : null;
};

type Root = OpenBdBook[];

export interface OpenBdBook {
	onix: Onix;
	hanmoto: Hanmoto;
	summary: Summary;
}

interface Onix {
	RecordReference: string;
	NotificationType: string;
	ProductIdentifier: ProductIdentifier;
	DescriptiveDetail: DescriptiveDetail;
	CollateralDetail: CollateralDetail;
	PublishingDetail: PublishingDetail;
	ProductSupply: ProductSupply;
}

interface ProductIdentifier {
	ProductIDType: string;
	IDValue: string;
}

interface DescriptiveDetail {
	ProductComposition: string;
	ProductForm: string;
	ProductFormDetail: string;
	Collection: Collection;
	TitleDetail: TitleDetail;
	Contributor: Contributor[];
	Language: Language[];
	Extent: Extent[];
	Subject: Subject[];
	Audience: Audience[];
}

interface Collection {
	CollectionType: string;
	CollectionSequence: CollectionSequence;
	CollectionSequenceArray: CollectionSequenceArray[];
}

interface CollectionSequence {
	CollectionSequenceType: string;
	CollectionSequenceTypeName: string;
	CollectionSequenceNumber: string;
}

interface CollectionSequenceArray {
	CollectionSequenceType: string;
	CollectionSequenceTypeName: string;
	CollectionSequenceNumber: string;
}

interface TitleDetail {
	TitleType: string;
	TitleElement: TitleElement;
}

interface TitleElement {
	TitleElementLevel: string;
	TitleText: TitleText;
	Subtitle: Subtitle;
}

interface TitleText {
	collationkey: string;
	content: string;
}

interface Subtitle {
	collationkey: string;
	content: string;
}

interface Contributor {
	SequenceNumber: string;
	ContributorRole: string[];
	PersonName: PersonName;
}

interface PersonName {
	collationkey: string;
	content: string;
}

interface Language {
	LanguageRole: string;
	LanguageCode: string;
}

interface Extent {
	ExtentType: string;
	ExtentValue: string;
	ExtentUnit: string;
}

interface Subject {
	MainSubject?: string;
	SubjectSchemeIdentifier: string;
	SubjectCode: string;
}

interface Audience {
	AudienceCodeType: string;
	AudienceCodeValue: string;
}

interface CollateralDetail {
	TextContent: TextContent[];
	SupportingResource: SupportingResource[];
}

interface TextContent {
	TextType: string;
	ContentAudience: string;
	Text: string;
}

interface SupportingResource {
	ResourceContentType: string;
	ContentAudience: string;
	ResourceMode: string;
	ResourceVersion: ResourceVersion[];
}

interface ResourceVersion {
	ResourceForm: string;
	ResourceVersionFeature: ResourceVersionFeature[];
	ResourceLink: string;
}

interface ResourceVersionFeature {
	ResourceVersionFeatureType: string;
	FeatureValue: string;
}

interface PublishingDetail {
	Imprint: Imprint;
	Publisher: Publisher;
	PublishingDate: PublishingDate[];
}

interface Imprint {
	ImprintIdentifier: ImprintIdentifier[];
	ImprintName: string;
}

interface ImprintIdentifier {
	ImprintIDType: string;
	IDValue: string;
}

interface Publisher {
	PublishingRole: string;
	PublisherIdentifier: PublisherIdentifier[];
	PublisherName: string;
}

interface PublisherIdentifier {
	PublisherIDType: string;
	IDValue: string;
}

interface PublishingDate {
	PublishingDateRole: string;
	Date: string;
}

interface ProductSupply {
	MarketPublishingDetail: MarketPublishingDetail;
	SupplyDetail: SupplyDetail;
}

interface MarketPublishingDetail {
	MarketPublishingStatus: string;
}

interface SupplyDetail {
	ProductAvailability: string;
	Price: Price[];
}

interface Price {
	PriceType: string;
	PriceAmount: string;
	CurrencyCode: string;
}

interface Hanmoto {
	datemodified: string;
	datecreated: string;
	datekoukai: string;
}

interface Summary {
	isbn: string;
	title: string;
	volume: string;
	series: string;
	publisher: string;
	pubdate: string;
	cover: string;
	author: string;
}
