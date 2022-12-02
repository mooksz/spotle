import { useState, useEffect, useReducer, useRef } from "react";

const initialState = {
	status: "idle",
	error: null,
	data: {},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCHING":
			return { ...initialState, status: "fetching" };
		case "FETCHED":
			return { ...initialState, status: "fetched", data: action.payload };
		case "FETCH_ERROR":
			return { ...initialState, status: "error", error: action.payload };
		default:
			return state;
	}
};

// Would do: Create object parameter with all query options for better construction
export const useSpotify = (q) => {
	const cache = useRef({});
	const [endpoint, setEndpoint] = useState(q);
	const [state, dispatch] = useReducer(reducer, initialState);
	const controller = new AbortController();
	const signal = controller.signal;
	const baseUrl = "/api/spotify/";

	useEffect(() => {
		let cancelRequest = false;

		if (!endpoint) return;

		const fetchData = async () => {
			dispatch({ type: "FETCHING" });

			if (cache.current[endpoint]) {
				dispatch({ type: "FETCHED", payload: cache.current[endpoint] });
				return;
			}

			try {
				const response = await fetch(`${baseUrl}${endpoint}`, { signal });

				if (response.status !== 200) {
					throw new Error(response.statusText);
				}

				const data = await response.json();

				cache.current[endpoint] = data;

				if (cancelRequest) return;

				dispatch({ type: "FETCHED", payload: data });
			} catch (error) {
				if (cancelRequest) return;
				dispatch({ type: "FETCH_ERROR", payload: error.message });
			}
		};

		fetchData();

		return () => {
			cancelRequest = true;
			controller.abort();
		};
	}, [endpoint]);

	return {
		refetch: setEndpoint,
		error: state.error,
		status: state.status,
		data: state.data,
	};
};
