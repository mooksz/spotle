import { cleanClassName } from "@/lib/cleanClassName";
import styles from "./AnchorButton.module.scss";

export const Button = (props) => {
	const {
		children,
		primary,
		secondary,
		tertiary,
		textLink,
		wrapper,
		className,
		...rest
	} = props;

	return (
		<button
			className={cleanClassName(
				` ${className ? className : ""} ${
					primary
						? `${styles["btn"]} ${styles["primary"]}`
						: secondary
						? `${styles["btn"]} ${styles["secondary"]}`
						: textLink
						? styles["text-link"]
						: wrapper
						? styles["wrapper"]
						: `${styles["btn"]} ${styles["primary"]}`
				}`
			)}
			{...rest}>
			{children}
		</button>
	);
};
