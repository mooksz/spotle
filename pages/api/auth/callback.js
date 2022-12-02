import { setCookie } from "cookies-next";
import aes256 from "aes256";

const callbackRoute = async (req, res) => {
	const code = req.query?.code || null;

	const queryString = new URLSearchParams({
		code: code,
		redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
		grant_type: "authorization_code",
	}).toString();

	try {
		const response = await fetch(
			`https://accounts.spotify.com/api/token?${queryString}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						new Buffer(
							process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET
						).toString("base64"),
				},
			}
		);

		const { access_token, expires_in, refresh_token } = await response.json();

		const defaultCookieOptions = { req: req, res: res, httpOnly: true };

		setCookie("access_token", aes256.encrypt(process.env.SALT, access_token), {
			...defaultCookieOptions,
			maxAge: expires_in,
		});

		setCookie("refresh_token", aes256.encrypt(process.env.SALT, refresh_token), {
			...defaultCookieOptions,
		});

		setCookie("is_logged_in", true, {
			...defaultCookieOptions,
			httpOnly: false,
		});

		res.redirect(301, `/`);
	} catch (error) {
		res.redirect(301, `/?error=${error.message}`);
	}
};

export default callbackRoute;
