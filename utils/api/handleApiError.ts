/* eslint-disable no-console */
import { NextApiResponse } from 'next';
import { ApiError } from 'utils/errors';

export default function handleApiError(e: unknown, res: NextApiResponse) {
	let status = 500;
	if (e instanceof ApiError) status = e.status;
	console.error(e);
	return res.status(status).json({ error: `${e}` });
}
