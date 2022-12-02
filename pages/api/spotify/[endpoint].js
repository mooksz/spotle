import { getCookie, hasCookie, setCookie } from "cookies-next";
import { getAccesToken } from "@/lib/spotify";
import aes256 from "aes256";

const spotifyRoute = async (req, res) => {
	// Check the enpoint requested
	const endpoint = req.query.endpoint || null;
	const queryString = new URLSearchParams(
		// Conver query obj to array
		Object.entries(req.query)
			// remove endpoint key
			.filter(([key, value]) => key !== "endpoint")
			//Convert back to obj
			.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
	).toString(); // Convert to URL search params -> string

	if (!endpoint) {
		res.status(400).json({ error: "endpoint is required" });
	}

	// Check if we have an access token
	let accessToken = hasCookie("access_token", { res, req })
		? aes256.decrypt(process.env.SALT, getCookie("access_token", { res, req }))
		: null;

	if (!accessToken) {
		// If there is no access token we know user isn't logged in and we get a access token via client credentials auths
		const { access_token, expires_in } = await getAccesToken(req, res);

		// Set that as the current token
		setCookie("access_token", aes256.encrypt(process.env.SALT, access_token), {
			req: req,
			res: res,
			httpOnly: true,
			maxAge: expires_in,
		});

		accessToken = access_token;
	}

	const baseUrl = "https://api.spotify.com/v1/";
	const url = `${baseUrl}${endpoint}${queryString ? "?" + queryString : ""}`;

	try {
		const fetchResponse = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: "Bearer " + accessToken,
			},
		});

		if (fetchResponse.status !== 200) {
			res
				.status(fetchResponse.status)
				.send({ error: "failed to fetch data", message: fetchResponse.statusText });
			return;
		}

		const data = await fetchResponse.json();

		res.send(JSON.stringify(data));
	} catch (error) {
		res
			.status(500)
			.send({ error: "failed to fetch data", message: error.message });
	}
};

export default spotifyRoute;
