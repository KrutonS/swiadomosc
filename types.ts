import { ButtonHTMLAttributes } from 'react';
import { ResponsiveImageType } from 'react-datocms';

export type UArray = Array<unknown>;
// eslint-disable-next-line no-unused-vars
export type FArgs<P extends UArray> = (...args: P) => void;

export interface Img {
	responsiveImage: ResponsiveImageType;
	title?: string;
	alt?: string;
}

export interface Author {
	avatar: Img;
	id: string;
	name: string;
}
export interface Category {
	id: string;
	name: string;
}
export interface Post {
	author?: Author;
	category?: Category;
	picture?: Img;
	title: string;
}

export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>['type'];

export type AddressType = {
	city: string;
	street: string;
	zip: string;
};

export interface Meeting {
	id: string;
	name: string;
	startTime: string;
	length: number;
	weekly: boolean;
}
// export interface Option {
// 	value: string;
// 	label?: string;
// }
