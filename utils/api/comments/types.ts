import { NextApiResponse } from 'next';
import { IComment, ResponseError } from 'types';

export type CommentsApiResponse = NextApiResponse<ResponseError | IComment[]>;
export type CommentApiResponse = NextApiResponse<ResponseError | IComment>;
