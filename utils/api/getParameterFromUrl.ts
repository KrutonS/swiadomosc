const getParameterFromUrl = (
	url: string | undefined,
	key: string
): string | null => url?.match(`[?&]${key}=([^&]+)`)?.[1] || null;

export default getParameterFromUrl;
