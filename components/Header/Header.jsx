import { Column, Container, Row } from "@/components/Grid/Grid";
import { Brand } from "@/components/Brand/Brand";
import { Auth } from "@/components/Auth/Auth";
import styles from "./Header.module.scss";

export const Header = (props) => {
	return (
		<header className={styles["header"]}>
			<Container>
				<Row alignCenter>
					<Column col={6}>
						<Brand />
					</Column>

					<Column col={6}>
						<Auth />
					</Column>
				</Row>
			</Container>
		</header>
	);
};
