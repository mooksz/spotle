import styles from "./SearchBar.module.scss";
import { Column, Container, Row } from "@/components/Grid/Grid";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { TypesSelector } from "@/components/TypesSelector/TypesSelector";
import MicrophoneWhiteIcon from "@/components/Icons/microphone-white.svg";

export const SearchBar = (props) => {
	const { type, setType, value, setValue } = props;
	const { isRecording, record, stopRecording } = useSpeechToText(setValue);

	return (
		<div className={styles["searchbar"]}>
			<Container>
				<Row>
					<Column col={12} md={10} offsetMD={1} lg={8} offsetLG={2}>
						<div className={styles["wrapper"]}>
							<TypesSelector type={type} setType={setType} />

							<input
								type='text'
								className={styles["input"]}
								onChange={(e) => setValue(e.target.value)}
								value={value}
								placeholder='Search...'
							/>

							<button
								className={`${styles["record"]} ${
									isRecording ? styles["recording"] : ""
								}`}
								type='button'
								onClick={isRecording ? stopRecording : record}>
								<MicrophoneWhiteIcon />
							</button>
						</div>
					</Column>
				</Row>
			</Container>
		</div>
	);
};
