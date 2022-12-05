import globalStyles from "./ResultsItem.module.scss";
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
		<div className={globalStyles["track"]}>
			<Anchor
				href={external_urls?.spotify}
				target='_blank'
				wrapper
				className={globalStyles["link"]}>
				<div className={globalStyles["image-wrapper"]}>
					{image?.url && (
						<Image
							src={image.url}
							width={image.width}
							height={image.height}
							alt={`Artist: ${name}`}
							className={globalStyles["image"]}
						/>
					)}
				</div>

				<div className={globalStyles["info-wrapper"]}>
					<div className={globalStyles["name"]}>{name}</div>
					<div className={globalStyles["info"]}>
						<span className={globalStyles["type"]}>{type}</span>
					</div>
				</div>

				{SaveButton}

				<ExternalLinkWhiteIcon className={globalStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
