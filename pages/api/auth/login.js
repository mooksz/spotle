import { SCOPE } from "@/lib/spotify";

const loginRoute = async (req, res) => {
	const queryString = new URLSearchParams({
		response_type: "code",
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: SCOPE,
		redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
	}).toString();

	res.redirect(301, `https://accounts.spotify.com/authorize?${queryString}`);
};

export default loginRoute;
