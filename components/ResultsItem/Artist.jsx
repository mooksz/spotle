import resultsItemStyles from "./ResultsItem.module.scss";
import Image from "next/image";
import ExternalLinkWhiteIcon from "@/components/Icons/external-link-white.svg";
import { Anchor } from "@/components/Anchor/Anchor";

export const Artist = (props) => {
	const { name, genres, images, external_urls, type } = props;
	const image = images.length ? images[0] : null;

	return (
		<div className={resultsItemStyles["artist"]}>
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
						<span className={resultsItemStyles["type"]}>{type} - </span>
						<span className={resultsItemStyles["genres"]}>{genres.join(" - ")}</span>
					</div>
				</div>

				<ExternalLinkWhiteIcon className={resultsItemStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
