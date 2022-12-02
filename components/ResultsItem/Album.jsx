import globalStyles from "./ResultsItem.module.scss";
import Image from "next/image";
import ExternalLinkWhiteIcon from "@/components/Icons/external-link-white.svg";
import { Anchor } from "@/components/Anchor/Anchor";

export const Album = (props) => {
	const { name, images, external_urls, release_date, type } = props;
	const image = images.length ? images[0] : null;

	return (
		<div className={globalStyles["album"]}>
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
						<span className={globalStyles["release-date"]}>{release_date}</span>
					</div>
				</div>

				<ExternalLinkWhiteIcon className={globalStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
