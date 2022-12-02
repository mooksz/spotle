import { Header } from "@/components/Header/Header";
import { useSpotify } from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Preface } from "@/components/Homepage/Preface/Preface";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Results } from "@/components/Results/Results";
import { SEARCH_TYPES } from "@/lib/spotify";
import { ErrorNotice } from "@/components/ErrorNotice/ErrorNotice";
import { motion, useReducedMotion } from "framer-motion";

// ! Would do, use more global state, store / context, prevent propdrilling
export default function Page() {
	const { refetch, data, status, error } = useSpotify();
	const [term, setTerm] = useState("");
	const [type, setType] = useState(SEARCH_TYPES.ALL.value);
	const debouncedTerm = useDebounce(term, 500);
	const shouldReduceMotion = useReducedMotion();

	// ! Would do: move useEffect to a hook, atm wouldn't know best solution for this
	useEffect(() => {
		if (!debouncedTerm || !type) return;
		const endpoint = `search?q=${debouncedTerm}&type=${type}&limit=3`;
		refetch(endpoint);
	}, [debouncedTerm, type]);

	const ANIMATION_SPEED = 0.5;

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
					y: 15,
				},
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: ANIMATION_SPEED,
					},
				},
		  }
		: {};

	return (
		<>
			<Header />
			<motion.div variants={containerVariants} initial='hidden' animate='visible'>
				<motion.div variants={itemVariants}>
					<Preface />
				</motion.div>

				<motion.div variants={itemVariants}>
					<SearchBar type={type} setType={setType} value={term} setValue={setTerm} />
				</motion.div>
			</motion.div>

			{!error && <Results items={data} />}

			{error && (
				<ErrorNotice>
					<p>Woops something went wrong, please refresh the page</p>
				</ErrorNotice>
			)}

			{/* ! Would do: add pagination */}
		</>
	);
}
