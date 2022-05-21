/* eslint-disable no-console */
import { IComment } from 'types';
import { ApiError } from 'next/dist/server/api-utils';
import Comment from 'models/Comment';

export default async function addComment(body: string) {
	const data = JSON.parse(body) as Partial<IComment>;
	if (data.author && data.content && data.uuid && data.postId) {
		const newComment = new Comment(data);
		await newComment.save();
		return newComment;
	}
	throw new ApiError(400, `Body is invalid ${body}`);
}
