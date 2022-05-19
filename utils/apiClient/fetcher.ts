export default async function fetcher(url: string, body?: RequestInit['body']) {
	const options: RequestInit = body ? { method: 'POST', body } : {};
	const res = await fetch(url, options);
	const data = await res.json();
	return data;
}
