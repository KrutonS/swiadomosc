/* eslint-disable no-console */
import Comment from 'models/Comment';
import { ApiError } from 'next/dist/server/api-utils';

export default async function getCommentsByPost(postId: string) {
	if (postId) {
		console.log(`Getting comments for ${postId}`);
		const comments = await Comment.find({ postId });
		console.log(comments);
		return comments;
	}
	throw new ApiError(400, 'No postId provided');
}
