/* eslint-disable no-console */
import { ResponseErrorApi } from './types';

export default function handleApiError(
	error: string,
	status: number,
	res: ResponseErrorApi
) {
	console.error(error);
	res.status(status).json({ error });
}
