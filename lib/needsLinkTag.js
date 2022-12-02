export const needsLinkTag = (url) => {
	return !(
		url.includes("http://") ||
		url.includes("https://") ||
		url.startsWith("#") ||
		url.startsWith("mailto") ||
		url.startsWith("tel")
	);
};
