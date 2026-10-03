import { 
    getAllArtistsAndProfiles, 
    getArtistBySlug, 
    getArtworksForArtist, 
    getProfileImagePath 
} from '../../data/artists';
import { blogPosts } from '../../data/blog';
import { notFound } from 'next/navigation';
import ArtistClient from './ArtistClient';

export async function generateStaticParams() {
    return getAllArtistsAndProfiles().map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const artist = getArtistBySlug(slug);
    if (!artist) return { title: 'Profile Not Found' };
    return {
        title: `${artist.name} - USK Galle`,
        description: artist.bio,
    };
}

export default async function ArtistPage({ params }) {
    const { slug } = await params;
    const artist = getArtistBySlug(slug);

    if (!artist) return notFound();

    const artworks = getArtworksForArtist(artist);
    const profileImage = getProfileImagePath(artist);

    // Get any blog articles written by or attributed to this profile
    const articles = blogPosts.filter(
        (p) => p.authorSlug === slug || (slug === 'system' && (!p.authorSlug || p.authorSlug === 'system'))
    );

    return (
        <ArtistClient
            artist={artist}
            artworks={artworks}
            profileImage={profileImage}
            articles={articles}
        />
    );
}
