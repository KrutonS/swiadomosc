import Comment from 'models/Comment';
import { ApiError } from 'utils/errors';

export default async function getComment(id: string) {
	const comment = await Comment.findById(id).exec();
	if (comment) return comment;
	throw new ApiError(400, `Comment with id ${id} not found`);
}
