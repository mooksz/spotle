import { Column, Container, Row } from "@/components/Grid/Grid";
import styles from "./Preface.module.scss";

export const Preface = () => {
	return (
		<div className={styles["preface"]}>
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
						<h1 className={`${styles["heading"]} heading-1`}>
							You're favorite Spotify <br />
							<span className={styles["hightlight"]}>search engine</span>!
						</h1>
					</Column>
				</Row>
			</Container>
		</div>
	);
};
