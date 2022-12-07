import { useState, useEffect, createContext } from "react";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(undefined);
	const router = useRouter();

	useEffect(() => {
		setIsLoggedIn(hasCookie("is_logged_in"));
	}, []);

	const login = () => {
		router.push("/api/auth/login");
	};

	const logout = () => {
		router.push("/api/auth/logout");
	};

	return (
		<UserContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
