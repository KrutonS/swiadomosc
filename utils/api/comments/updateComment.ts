import Comment from 'models/Comment';
import { IComment } from 'types';
import { ApiError } from 'utils/errors';

export default async function updateComment(
	id: string,
	body: IComment | undefined
) {
	if (!body) {
		throw new ApiError(400, `No body specified for update in comment ${id}`);
	}
	const newComment = await Comment.findByIdAndUpdate(id, body);
	if (newComment) {
		return newComment;
	}
	throw new ApiError(
		400,
		`Couldn't update comment with id ${id} and data ${JSON.stringify(body)}`
	);
}
