import type { NextApiRequest, NextApiResponse } from "next";
import { hasCookie, getCookie } from "cookies-next";
import aes256 from "aes256";

export const SCOPE = "user-library-read,user-read-private,user-library-modify";

export const SEARCH_TYPES = {
	ALL: {
		key: "All",
		value: "album,artist,track",
	},
	ALBUMS: {
		key: "Albums",
		value: "album",
	},
	ARTIST: {
		key: "Artists",
		value: "artist",
	},
	TRACKS: {
		key: "Tracks",
		value: "track",
	},
};

export const getAccesToken = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	// Do we have a refresh token available?
	const refresh_token = hasCookie("refresh_token", { req, res })
		? aes256
				.decrypt(
					process.env.SALT,
					getCookie("refresh_token", { req, res }).toString() // This is to shut up typescript is this correct?
				)
				.toString() // This is to shut up typescript is this correct?
		: null;

	try {
		const queryString = refresh_token
			? new URLSearchParams({
					grant_type: "refresh_token",
					refresh_token: refresh_token,
			  }).toString()
			: new URLSearchParams({
					grant_type: "client_credentials",
			  }).toString();

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

		return await response.json();
	} catch (error) {
		throw new Error(`Failed to fetch access token. ${error.message}`);
	}
};
