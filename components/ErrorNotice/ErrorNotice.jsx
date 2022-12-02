import styles from "./ErrorNotice.module.scss";
import { Container, Row, Column } from "@/components/Grid/Grid";

export const ErrorNotice = (props) => {
	const { children } = props;

	return (
		<Container>
			<Row>
				<Column
					col={12}
					md={10}
					offsetMD={1}
					lg={8}
					offsetLG={2}
					xl={6}
					offsetXL={3}>
					<div className={styles["notice"]}>{children}</div>
				</Column>
			</Row>
		</Container>
	);
};
