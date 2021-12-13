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
	author: Author;
	commentsCount: number;
	ytUrl: string;
}
export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>['type'];

export type AddressType = {
	city: string;
	street: string;
	zip: string;
};

export interface Meeting {
	name: string;
	startTime: number;
	length: number;
	annual?: boolean;
}
