/* eslint-disable no-console */
import { NextApiRequest } from 'next';
import { IComment } from 'types';
import Comment from 'models/Comment';
import handleApiError from '../handleApiError';
import { ResponseErrorApi } from '../types';

export default async function addComment(
	req: NextApiRequest,
	res: ResponseErrorApi
) {
	try {
		const data = JSON.parse(req.body) as Partial<IComment>;
		console.log(data);
		if (data.author && data.content && data.uuid) {
			const comment = new Comment(data);
			await comment.save();
			console.log('NEW COMMENT');
			res.status(200).end();
		} else throw new Error(`Body is invalid ${req.body}`);
	} catch (e) {
		handleApiError(`Error adding comment ${e} ${req.body}`, 400, res);
	}
}
