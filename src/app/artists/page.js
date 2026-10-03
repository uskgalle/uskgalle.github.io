import { artists, getArtworksForArtist, getProfileImagePath } from '../data/artists';
import ArtistsClient from './ArtistsClient';

export const metadata = {
    title: 'Artists - USK Galle',
    description: 'Discover the urban sketchers and artists of Galle, Sri Lanka.',
};

export default function ArtistsPage() {
    const artistsData = artists
        .map((artist) => {
            const artworks = getArtworksForArtist(artist);
            const profileImage = getProfileImagePath(artist);

            return {
                ...artist,
                sketchCount: artworks.length,
                profileImage: profileImage || '/artists-images/no_profile.png',
            };
        })
        .filter((artist) => artist.sketchCount > 0);

    return <ArtistsClient initialArtists={artistsData} />;
}