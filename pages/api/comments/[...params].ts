/* eslint-disable no-console */
import connectMongoDB from 'lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import getCommentByUser from 'utils/api/comments/getCommentByUser';
import handleApiError from 'utils/api/handleApiError';

export default async function queryComments(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongoDB(req, res);
	const { method } = req;
	switch (method?.toUpperCase()) {
		case 'GET': {
			const { params } = req.query;
			switch (params.length) {
				case 1: {
					getCommentByUser(req, res);
					break;
				}
				default: {
					handleApiError('Invalid path', 400, res);
					break;
				}
			}
			break;
		}
		default: {
			handleApiError(`Unsupported method ${method}`, 405, res);
		}
	}
}
