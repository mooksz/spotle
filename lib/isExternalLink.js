export const isExternalLink = (url) => {
	if (typeof url !== "string") return url;

	return url.startsWith("http") && !url.includes(process.env.NEXT_PUBLIC_DOMAIN)
		? true
		: false;
};
