import { useEffect, useState } from "react";
import { hasCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

// Would do: rewrite to context
export const useUser = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(undefined);
	const router = useRouter();

	useEffect(() => {
		setIsLoggedIn(hasCookie("is_logged_in"));
	}, []);

	const login = () => {
		router.push("/api/auth/login");
	};

	// Would do: make back-end route to delete refresh token and access token cookies.
	const logout = () => {
		deleteCookie("is_logged_in");
		setIsLoggedIn(false);
	};

	return { isLoggedIn, login, logout };
};
