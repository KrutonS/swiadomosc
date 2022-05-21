import connectMongoDB from 'lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import addComment from 'utils/api/comments/addComment';
import handleApiError from 'utils/api/handleApiError';

export default async function comments(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongoDB();
	const { method } = req;
	switch (method?.toUpperCase()) {
		case 'POST': {
			return addComment(req, res);
		}
		default: {
			return handleApiError(`Unsupported method ${method}`, 405, res);
		}
	}
}
