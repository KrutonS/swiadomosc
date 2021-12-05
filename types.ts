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
