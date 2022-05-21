/* eslint-disable no-console */
import connectMongoDB from 'lib/mongo';
import { NextApiRequest } from 'next';
import { IComment } from 'types';
import deleteComment from 'utils/api/comments/deleteComment';
import getComment from 'utils/api/comments/getComment';
import updateComment from 'utils/api/comments/updateComment';
import handleApiError from 'utils/api/handleApiError';
import { NextApiAppResponse } from 'utils/api/types';
import { ApiError } from 'utils/errors';

export default async function queryComments(
	req: NextApiRequest,
	res: NextApiAppResponse<IComment | IComment[]>
) {
	try {
		await connectMongoDB();
		const { method, query } = req;
		const [commentId] = query.params;
		switch (method?.toUpperCase()) {
			case 'GET': {
				const comment = await getComment(commentId);
				return res.status(200).json({ data: comment.toJSON() });
			}
			case 'DELETE': {
				await deleteComment(commentId);
				return res.status(200).end();
			}
			case 'UPDATE': {
				const comment = await updateComment(commentId, req.body);
				return res.status(200).json({ data: comment.toJSON() });
			}
			default: {
				throw new ApiError(
					400,
					`method ${method} not supported for ${req.url}`
				);
			}
		}
	} catch (e) {
		return handleApiError(e, res);
	}
}
