import connectMongoDB from 'lib/mongo';
import { HydratedDocument } from 'mongoose';
import { NextApiRequest } from 'next';
import { IComment } from 'types';
import addComment from 'utils/api/comments/addComment';
import getCommentByPost from 'utils/api/comments/getCommentsByPost';
import getCommentsByUser from 'utils/api/comments/getCommentsByUser';
import getParameterFromUrl from 'utils/api/getParameterFromUrl';
import handleApiError from 'utils/api/handleApiError';
import { NextApiAppResponse } from 'utils/api/types';
import { ApiError } from 'utils/errors';

export default async function handleApiComments(
	req: NextApiRequest,
	res: NextApiAppResponse<IComment | IComment[]>
) {
	try {
		await connectMongoDB();
		const { method } = req;
		switch (method?.toUpperCase()) {
			case 'POST': {
				const newComment = await addComment(req.body);
				return res.status(200).json({ data: newComment.toJSON() });
			}
			case 'GET': {
				let comments: HydratedDocument<IComment>[] = [];
				if (!req.url) throw new ApiError(500, `No req.url`);
				const uuid = getParameterFromUrl(req.url, 'uuid');
				if (uuid !== null) comments = await getCommentsByUser(uuid);
				else {
					const postId = getParameterFromUrl(req.url, 'postId');

					if (postId !== null) comments = await getCommentByPost(postId);
					else {
						throw new ApiError(
							400,
							`No uuid and postId searchParams provided in ${req.url}`
						);
					}
				}
				return res.status(200).json({ data: comments.map(c => c.toJSON()) });
			}
			default: {
				throw new ApiError(
					400,
					`No method ${req.method} supported for ${req.url}`
				);
			}
		}
	} catch (e) {
		return handleApiError(e, res);
	}
}
