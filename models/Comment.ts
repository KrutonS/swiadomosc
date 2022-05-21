import { Schema } from 'mongoose';
import { IComment } from 'types';
import { makeModel } from './utils';

const commentSchema = new Schema<IComment>({
	uuid: { type: String, required: true },
	content: { type: String, required: true },
	author: { type: String, required: true },
	postId: { type: String, required: true },
	stamp: { type: Number, required: true },
});

const Comment = makeModel('Comment', commentSchema);

export default Comment;
