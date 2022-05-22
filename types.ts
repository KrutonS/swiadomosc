import { ButtonHTMLAttributes } from 'react';
import {
	ResponsiveImageType,
	StructuredTextGraphQlResponse,
	ToMetaTagsType,
} from 'react-datocms';

export type UArray = Array<unknown>;
export type FArgs<P extends UArray> = (...args: P) => void;

export interface SeoData {
	seoMetaTags: ToMetaTagsType;
}
export interface DatoImg {
	responsiveImage: ResponsiveImageType;
	title?: string;
	alt?: string;
}

export interface Author {
	avatar: DatoImg;
	name: string;
}
export interface Category {
	name: string;
}
export interface Video {
	// url: string;
	title: string;
	providerUid: string;
	width?: number;
	height?: number;
}
export interface Post extends SeoData {
	id: string;
	title: string;
	slug: string;
	content: StructuredTextGraphQlResponse<
		| { __typename: 'VideoBlockRecord'; id: string; video: Video }
		| { __typename: 'ImageBlockRecord'; id: string; image: DatoImg }
	>;
	author?: Author;
	category?: Category;
	picture?: DatoImg;
	showcasedVideo?: Video;
	commentsCount?: number;
}

export interface CalendarData {
	meetingsPage: {
		maxHour: number;
		minHour: number;
		hourStep: number;
		minDay: string;
		maxDay: string;
		height?: number;
	} & SeoData;
}

export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>['type'];

export interface Meeting {
	id: string;
	name: string;
	startTime: string;
	length: number;
	weekly: boolean;
}
export interface DatoColor {
	hex: string;
}
export interface TextListRecord {
	__typename: 'TextListRecord';
	id: string;
	title: string;
	title2?: string;
	list?: { text: string; id: string }[];
	text?: StructuredTextGraphQlResponse;
}
export interface TextImageRecord {
	__typename: 'TextImageRecord';
	id: string;
	fixed: boolean;
	title: string;
	text?: StructuredTextGraphQlResponse;
	image?: DatoImg;
	backgroundColor?: DatoColor;
}
export interface LinkRecord {
	__typename: 'LinkRecord';
	id: string;
	href: string;
	text: string;
	background?: DatoImg;
}
export type AboutContentType = (
	| TextListRecord
	| TextImageRecord
	| LinkRecord
)[];

export interface Contact {
	contact: {
		city: string;
		street: string;
		zip: string;
		email: string;
		phone?: string;
	};
}

type DeepKeys2<O> = { [K in keyof O]?: DeepKeys2<NonNullable<O[K]>> } | keyof O;
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
	U[keyof U];
type ExcludeEmpty<T> = T extends AtLeastOne<T> ? T : never;
export type SliceObject<O, T extends DeepKeys2<O>> = O extends never
	? never
	: {
			[K in Extract<keyof Extract<T, object> | T, keyof O>]: K extends T
				? NonNullable<O[K]>
				: NonNullable<ExcludeEmpty<SliceObject<O[K], Extract<T, object>[K]>>>;
	  };

export type GetProps<T extends (...args: unknown[]) => unknown> =
	Parameters<T>[0];

export type EmailWIthPassword = { email: string; password: string };
export type EmailPasswordAndName = EmailWIthPassword & { displayName: string };

export interface IComment {
	_id: string;
	uuid: string;
	postId: string;
	content: string;
	author: string;
	stamp: number;
}
export interface ResponseError {
	error?: string;
}

export type ApiResponseClient<T> = Partial<{ data?: T } & ResponseError>;
