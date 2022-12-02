export const cleanClassName = (string: string): string => {
	return string.replace(/  +/g, " ").trim();
};
