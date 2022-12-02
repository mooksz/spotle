export const getHashFromString = (url: string): string => {
	return url.split("#")[1] ? url.split("#")[1] : "";
};
