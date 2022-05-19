import { models, model, Model, Schema } from 'mongoose';

export const makeModel = <T>(key: string, schema: Schema<T>): Model<T> =>
	(models[key] || model<T>(key, schema)) as Model<T>;
