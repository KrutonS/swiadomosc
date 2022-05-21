import Comment from 'models/Comment';
import { ApiError } from 'utils/errors';

export default async function deleteComment(id: string) {
	const comment = await Comment.findByIdAndDelete(id).exec();
	if (!comment) throw new ApiError(400, `Comment with id ${id} not found`);
}
