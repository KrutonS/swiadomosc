/* eslint-disable no-console */
import Comment from 'models/Comment';
import { NextApiRequest } from 'next';
import handleApiError from '../handleApiError';
import { CommentsApiResponse } from './types';

export default async function getCommentByUser(
	req: NextApiRequest,
	res: CommentsApiResponse
) {
	const { params } = req.query;
	const [uuid] = params;
	if (uuid) {
		console.log(`Getting comments for ${uuid}`);
		const comments = await Comment.find({ uuid });
		res.status(200).json(comments);
	} else handleApiError('No uuid provided', 400, res);
}
