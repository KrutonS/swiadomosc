import { NextApiResponse } from 'next';
import { ResponseError } from 'types';

export type ResponseErrorApi = NextApiResponse<ResponseError>;
