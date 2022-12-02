import Link from "next/link";
import { isExternalLink } from "@/lib/isExternalLink";
import { getHashFromString } from "@/lib/getHashFromString";
import { cleanClassName } from "@/lib/cleanClassName";
import { needsLinkTag } from "@/lib/needsLinkTag";
import { ConditionalWrapper } from "@/components/ConditionalWrapper/ConditionalWrapper";
import styles from "./AnchorButton.module.scss";

export const Anchor = (props) => {
	const {
		children,
		href,
		rel,
		target,
		primary,
		secondary,
		tertiary,
		textLink,
		wrapper,
		className,
		...rest
	} = props;

	const isExternal = isExternalLink(href);
	const hasHash = getHashFromString(href);
	const wrapInLinkTag = needsLinkTag(href);

	return (
		<ConditionalWrapper
			condition={wrapInLinkTag}
			wrapperOne={(children) => {
				return (
					<Link href={href} passHref legacyBehavior>
						{children}
					</Link>
				);
			}}>
			<a
				{...(!wrapInLinkTag && { href })}
				rel={rel ? rel : isExternal ? "noreferrer" : hasHash ? "nofollow" : null}
				target={target || null}
				className={cleanClassName(
					`${className ? className : ""} ${
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
			</a>
		</ConditionalWrapper>
	);
};
