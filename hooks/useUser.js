import { useEffect, useState } from "react";
import { hasCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

export const useUser = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(undefined);
	const router = useRouter();

	useEffect(() => {
		setIsLoggedIn(hasCookie("is_logged_in"));
	}, []);

	const login = () => {
		router.push("/api/auth/login");
	};

	const logout = () => {
		deleteCookie("refresh_token");
		deleteCookie("access_token");
		deleteCookie("is_logged_in");
		setIsLoggedIn(false);
	};

	return { isLoggedIn, login, logout };
};
