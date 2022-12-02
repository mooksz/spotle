import styles from "./Brand.module.scss";
import { Anchor } from "@/components/Anchor/Anchor";

export const Brand = (props) => {
	return (
		<div className={styles["brand"]}>
			<Anchor href='/' wrapper className={styles["link"]}>
				Spot<span className={styles["highlight"]}>le</span>
			</Anchor>
		</div>
	);
};
