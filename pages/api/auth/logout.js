import { deleteCookie } from "cookies-next";

const logoutRoute = async (req, res) => {
	deleteCookie("access_token", { req, res });

	deleteCookie("refresh_token", { req, res });

	deleteCookie("is_logged_in", { req, res });

	res.redirect(301, `/`);
};

export default logoutRoute;
