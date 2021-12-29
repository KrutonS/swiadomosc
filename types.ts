import { ButtonHTMLAttributes } from 'react';
import { ResponsiveImageType } from 'react-datocms';
import { Primitive } from 'react-hook-form';

export type UArray = Array<unknown>;
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
export interface Video {
	url: string;
}
export interface Post {
	title: string;
	author?: Author;
	category?: Category;
	picture?: Img;
	showcasedVideo?: Video;
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

type DeepKeys<
	O,
	GiveKeyToo extends boolean = false,
	K extends keyof O = keyof O
> = K extends never
	? never
	: O[K] extends Primitive
	? K
	: GiveKeyToo extends true
	? Record<K, DeepKeys<NonNullable<O[K]>, GiveKeyToo>> | K
	: Record<K, DeepKeys<NonNullable<O[K]>, GiveKeyToo>>;

type FilterPropertiesUnion<
	O,
	K extends DeepKeys<O, true> = DeepKeys<O>
> = K extends keyof O
	? Pick<O, K>
	: Record<keyof K, FilterPropertiesUnion<O[Extract<keyof K, keyof O>]>>;

type UnionToIntersection<T> = (
	T extends unknown ? (x: T) => unknown : never
) extends (x: infer R) => unknown
	? R
	: never;

export type FilterProperties<
	O,
	K extends DeepKeys<O, true> = DeepKeys<O>
> = UnionToIntersection<FilterPropertiesUnion<O, K>>;
