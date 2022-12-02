import globalStyles from "./ResultsItem.module.scss";
import Image from "next/image";
import ExternalLinkWhiteIcon from "@/components/Icons/external-link-white.svg";
import { Anchor } from "@/components/Anchor/Anchor";

export const Artist = (props) => {
	const { name, genres, images, external_urls, type } = props;
	const image = images.length ? images[0] : null;

	return (
		<div className={globalStyles["artist"]}>
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
						<span className={globalStyles["type"]}>{type} - </span>
						<span className={globalStyles["genres"]}>{genres.join(" - ")}</span>
					</div>
				</div>

				<ExternalLinkWhiteIcon className={globalStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
