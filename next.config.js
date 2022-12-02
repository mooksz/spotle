const path = require("path");

module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				// Spotify cdn
				protocol: "https",
				hostname: "i.scdn.co",
				pathname: "/image/**",
			},
		],
	},
};
