import { ResponseError } from 'types';

export default async function nextApiFetch<T>(
	url: string,
	options?: RequestInit
): Promise<{ data?: T; error?: string }> {
	try {
		const response = await fetch(url, options);
		const data = (await response.json()) as T & Partial<ResponseError>;
		if (data.error) throw new Error(data.error);
		return { data };
	} catch (e) {
		return { error: `FAILED [${options?.method ?? ''}] ${url} - ${e}` };
	}
}
