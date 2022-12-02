export const isExternalLink = (url: string): boolean => {
	return url.startsWith("http") && !url.includes(process.env.NEXT_PUBLIC_DOMAIN)
		? true
		: false;
};
