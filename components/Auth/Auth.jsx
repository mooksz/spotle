import styles from "./Auth.module.scss";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/Anchor/Button";

export const Auth = () => {
	const { isLoggedIn, login, logout } = useUser();

	if (isLoggedIn === undefined) return;

	return (
		<div className={styles["auth"]}>
			{!isLoggedIn ? (
				<Button onClick={login} primary>
					Login
				</Button>
			) : (
				<Button onClick={logout} secondary>
					Logout
				</Button>
			)}
		</div>
	);
};
