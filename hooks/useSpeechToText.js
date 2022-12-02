import { useState, useEffect, useRef } from "react";

// ! Would do: error handling
export const useSpeechToText = (setValueCallBack) => {
	const recognition = useRef();
	const [isRecording, setIsRecording] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		if (!window) return;
		const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

		recognition.current = new SpeechRecognition();
		recognition.current.lang = "en-US";
		recognition.current.interimResults = true;
		recognition.current.maxAlternatives = 1;
		recognition.current.continuous = false;

		recognition.current.addEventListener("end", () => {
			setIsRecording(false);
		});

		recognition.current.addEventListener("speechend", () => {
			recognition.current.stop();
		});

		recognition.current.addEventListener("audiostart", () => {
			setIsRecording(true);

			if (setValueCallBack) {
				setValueCallBack("");
			}
		});

		// ! Would do: what happens if no result?
		recognition.current.addEventListener("result", (e) => {
			const transcript = e.results[0][0].transcript;
			setResult(transcript);

			if (setValueCallBack) {
				setValueCallBack(transcript);
			}
		});
	}, [recognition.current]);

	const record = () => {
		recognition.current.start();
	};

	const stopRecording = () => {
		recognition.current.abort();
	};

	return { isRecording, result, record, stopRecording };
};
