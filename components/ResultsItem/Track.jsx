import resultsItemStyles from "./ResultsItem.module.scss";
import Image from "next/image";
import ExternalLinkWhiteIcon from "@/components/Icons/external-link-white.svg";
import { Anchor } from "@/components/Anchor/Anchor";
import { useUser } from "@/hooks/useUser";

export const Track = (props) => {
	// Would do: Login status needs to be be global state so it causes a rerender when loggin while
	// results are shown
	const { isLoggedIn } = useUser();
	const { name, album, external_urls, type, saved } = props;
	const image = album?.images?.length ? album.images[0] : null;

	const SaveButton =
		isLoggedIn && !saved
			? "Click to save"
			: isLoggedIn && saved
			? "Click to unsave"
			: null;

	return (
		<div className={resultsItemStyles["track"]}>
			<Anchor
				href={external_urls?.spotify}
				target='_blank'
				wrapper
				className={resultsItemStyles["link"]}>
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

				<ExternalLinkWhiteIcon className={resultsItemStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
