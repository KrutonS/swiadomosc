import useSWR, { SWRConfiguration } from 'swr';
import { AppError } from 'utils/errors';
import fetcher from './fetcher';

export default function useAppSWR<T>(url: string, options?: SWRConfiguration) {
	return useSWR<T, string | Error | AppError>(url, fetcher, options);
}
