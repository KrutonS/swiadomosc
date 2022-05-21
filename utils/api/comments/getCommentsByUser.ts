/* eslint-disable no-console */
import Comment from 'models/Comment';
import { ApiError } from 'utils/errors';

export default async function getCommentsByUser(uuid: string) {
	if (uuid) {
		console.log(`Getting comments for ${uuid}`);
		const comments = await Comment.find({ uuid });
		return comments;
	}
	throw new ApiError(400, 'No uuid provided');
}
