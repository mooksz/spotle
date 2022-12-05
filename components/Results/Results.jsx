import { useEffect, useState } from "react";
import { Container, Row, Column } from "@/components/Grid/Grid";
import styles from "./Results.module.scss";
import { ResultsItem } from "@/components/ResultsItem/ResultsItem";
import { motion, useReducedMotion } from "framer-motion";

export const Results = (props) => {
	const { items } = props;
	const [shuffledItems, setShuffledItems] = useState([]);
	// Would do: write render value to string instead of nummer to prevent key collision
	const [render, setRender] = useState(1);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		if (!Object.keys(items).length) return;

		const tmpItems = [];

		// Add all items to array
		Object.keys(items).forEach((key) => {
			items[key].items?.forEach((item) => {
				tmpItems.push(item);
			});
		});

		// Shuffle to fake results recommended results, Would do: use better algoritm
		setShuffledItems(tmpItems.sort(() => 0.5 - Math.random()));

		// Update key to rerender animation
		setRender((prevRender) => prevRender + 1);
	}, [items]);

	const ANIMATION_SPEED = 0.2;

	const containerVariants = !shouldReduceMotion
		? {
				hidden: {},
				visible: {
					transition: {
						staggerChildren: ANIMATION_SPEED,
					},
				},
		  }
		: {};

	const itemVariants = !shouldReduceMotion
		? {
				hidden: {
					opacity: 0,
					x: -15,
				},
				visible: {
					opacity: 1,
					x: 0,
					transition: {
						duration: ANIMATION_SPEED,
					},
				},
		  }
		: {};

	return (
		<div className={styles["results"]}>
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
						<motion.div
							variants={containerVariants}
							key={render}
							initial='hidden'
							animate='visible'>
							{shuffledItems.map((item) => {
								const { id } = item;
								return (
									<motion.div variants={itemVariants} key={id}>
										<ResultsItem {...item} />
									</motion.div>
								);
							})}
						</motion.div>
					</Column>
				</Row>
			</Container>
		</div>
	);
};
