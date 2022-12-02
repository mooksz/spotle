import globalStyles from "./ResultsItem.module.scss";
import Image from "next/image";
import ExternalLinkWhiteIcon from "@/components/Icons/external-link-white.svg";
import { Anchor } from "@/components/Anchor/Anchor";

export const Track = (props) => {
	const { name, album, external_urls, type } = props;
	const image = album?.images?.length ? album.images[0] : null;

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

				<ExternalLinkWhiteIcon className={globalStyles["link-icon"]} />
			</Anchor>
		</div>
	);
};
