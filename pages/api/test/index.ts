import connectMongoDB from 'lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default function testConnection(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return connectMongoDB(req, res);
}
