import resultsItemStyles from "./ResultsItem.module.scss";
import styles from "./Track.module.scss";
import Image from "next/image";
import ExternalLinkWhiteIcon from "@/components/Icons/external-link-white.svg";
import { Anchor } from "@/components/Anchor/Anchor";
import { useUser } from "@/hooks/useUser";
import HeartFilledWhiteIcon from "@/svgIcons/heart-filled-white.svg";
import HeartLinedWhiteIcon from "@/svgIcons/heart-lined-white.svg";
import { useSpotify } from "@/hooks/useSpotify";

export const Track = (props) => {
	const { isLoggedIn } = useUser();
	const { refetch } = useSpotify();
	const { name, album, external_urls, type, saved, id } = props;
	const image = album?.images?.length ? album.images[0] : null;

	const saveTrack = () => {
		// Would do: Rewrite useSpotify to be able to adjust fetch options
		// refetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`);
	};

	const unsaveTrack = () => {
		// Would do: Rewrite useSpotify to be able to adjust fetch options
		// refetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`);
	};

	const SaveButton =
		isLoggedIn && !saved ? (
			<button className={styles["save-button"]} type='button' onClick={saveTrack}>
				<HeartLinedWhiteIcon className={styles["save-icon"]} />
			</button>
		) : isLoggedIn && saved ? (
			<button
				className={styles["save-button"]}
				type='button'
				onClick={unsaveTrack}>
				<HeartFilledWhiteIcon className={styles["save-icon"]} />
			</button>
		) : null;

	return (
		<div className={resultsItemStyles["track"]}>
			<div className={resultsItemStyles["image-wrapper"]}>
				{image?.url && (
					<Image
						src={image.url}
						width={image.width}
						height={image.height}
						alt={`Artist: ${name}`}
						className={resultsItemStyles["image"]}
					/>
				)}
			</div>

			<div className={resultsItemStyles["info-wrapper"]}>
				<div className={resultsItemStyles["name"]}>{name}</div>
				<div className={resultsItemStyles["info"]}>
					<span className={resultsItemStyles["type"]}>{type}</span>
				</div>
			</div>

			{SaveButton}

			<Anchor href={external_urls?.spotify} target='_blank' wrapper>
				<ExternalLinkWhiteIcon className={resultsItemStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
