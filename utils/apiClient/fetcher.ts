import { ApiResponseClient } from 'types';

export default async function fetcher<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	const response = await fetch(url, options);
	const parsed = (
		response.ok ? await response.json() : {}
	) as ApiResponseClient<T>;
	if (!response.ok || parsed.error)
		throw new Error(`~[${response.status}]~ ${parsed.error}`);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return parsed.data!;
}
