/* eslint-disable no-console */
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import handleApiError from 'utils/api/handleApiError';

const connectMongoDB = async (_req?: NextApiRequest, res?: NextApiResponse) => {
	try {
		console.log('CONNECTING');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await mongoose.connect(process.env.MONGO_URI!);
		console.log(
			'[MONGOOSE] connected!',
			mongoose.connections.map(c => c.name)
		);
		res?.status(200).json({ message: '[MONGOOSE] connected!' });
	} catch (e) {
		if (res) handleApiError(`[Mongoose] not connected! ${e}`, 500, res);
		else console.error(`[Mongoose] not connected! ${e}`);
	}
};
export default connectMongoDB;
