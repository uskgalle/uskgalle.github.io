import { artists, getArtistBySlug, getArtworksForArtist, getProfileImagePath } from '../../data/artists';
import { notFound } from 'next/navigation';
import ArtistClient from './ArtistClient';

export async function generateStaticParams() {
    return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const artist = getArtistBySlug(slug);
    if (!artist) return { title: 'Artist Not Found' };
    return {
        title: `${artist.name} - USK Galle Artist`,
        description: artist.bio,
    };
}

export default async function ArtistPage({ params }) {
    const { slug } = await params;
    const artist = getArtistBySlug(slug);

    if (!artist) return notFound();

    const artworks = getArtworksForArtist(artist.folder);
    const profileImage = getProfileImagePath(artist.folder);

    return <ArtistClient artist={artist} artworks={artworks} profileImage={profileImage} />;
}
