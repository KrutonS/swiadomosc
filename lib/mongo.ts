/* eslint-disable no-console */
import mongoose from 'mongoose';
import { ApiError } from 'next/dist/server/api-utils';

const connectMongoDB = async () => {
	try {
		console.log('CONNECTING');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await mongoose.connect(process.env.MONGO_URI!);
		console.log('[MONGOOSE] connected!');
	} catch (e) {
		throw new ApiError(500, `[Mongoose] not connected! ${e}`);
	}
};
export default connectMongoDB;
