import { ButtonHTMLAttributes } from 'react';

export type UArray = Array<unknown>;
// eslint-disable-next-line no-unused-vars
export type FArgs<P extends UArray> = (...args: P) => void;

export interface Author {
	name: string;
	avatar: string;
}
export interface Post {
	title: string;
	image: string;
	commentsCount?: number;
	author?: Author;
	ytUrl?: string;
	category?: string;
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
