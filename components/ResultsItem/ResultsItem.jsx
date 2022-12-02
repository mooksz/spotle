import { Artist } from "@/components/ResultsItem/Artist";
import { SEARCH_TYPES } from "@/lib/spotify";
import { Album } from "@/components/ResultsItem/Album";
import { Track } from "@/components/ResultsItem/Track";

// Would discuss: Worth it to make them seperate components?
export const ResultsItem = (props) => {
	const { type } = props;

	if (type === SEARCH_TYPES.ARTIST.value) {
		return <Artist {...props} />;
	}

	if (type === SEARCH_TYPES.ALBUMS.value) {
		return <Album {...props} />;
	}

	if (type === SEARCH_TYPES.TRACKS.value) {
		return <Track {...props} />;
	}

	return null;
};
