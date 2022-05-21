import { NextApiResponse } from 'next';
import { ResponseError } from 'types';

export type NextApiAppResponse<T> = NextApiResponse<
	ResponseError & { data?: T }
>;
