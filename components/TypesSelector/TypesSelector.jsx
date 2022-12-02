import styles from "./TypesSelector.module.scss";
import { SEARCH_TYPES } from "@/lib/spotify";
import CaretDownBlackIcon from "@/components/Icons/caret-down-black.svg";

// ! Would do: make multiselect for better ux
export const TypesSelector = (props) => {
	const { type, setType } = props;

	const TypeOptions = () => {
		return Object.values(SEARCH_TYPES).map(({ key, value }) => {
			return (
				<option title={key} value={value} key={value}>
					{key}
				</option>
			);
		});
	};

	const onSelectChange = (e) => {
		setType(e.target.value);
	};

	return (
		<div className={styles["wrapper"]}>
			<select className={styles["select"]} value={type} onChange={onSelectChange}>
				<TypeOptions />
			</select>

			<CaretDownBlackIcon className={styles["caret-down"]} />
		</div>
	);
};
