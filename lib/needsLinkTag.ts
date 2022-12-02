export const needsLinkTag = (url: string): boolean => {
	return !(
		url.includes("http://") ||
		url.includes("https://") ||
		url.startsWith("#") ||
		url.startsWith("mailto") ||
		url.startsWith("tel")
	);
};
