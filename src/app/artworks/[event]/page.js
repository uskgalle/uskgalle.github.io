import { notFound } from 'next/navigation';
import { getAllArtworks } from '../../data/artists';
import { getRecapGallery } from '../../data/recap-gallery';
import ArtworksClient from '../ArtworksClient';

export const dynamicParams = false;

function getArtworkMeetups(artworks) {
    return getRecapGallery().meetups.filter(meetup => artworks.some(art => art.event === meetup.slug));
}

export function generateStaticParams() {
    return getArtworkMeetups(getAllArtworks()).map(meetup => ({ event: meetup.gallerySlug }));
}

export async function generateMetadata({ params }) {
    const { event } = await params;
    const meetup = getArtworkMeetups(getAllArtworks()).find(item => item.gallerySlug === event);
    if (!meetup) return {};
    return {
        title: `${meetup.title} Artworks - USK Galle`,
        description: `Explore sketches from ${meetup.title} by the Urban Sketchers Galle community.`,
    };
}

export default async function EventArtworksPage({ params }) {
    const { event } = await params;
    const artworks = getAllArtworks();
    const meetups = getArtworkMeetups(artworks);
    const meetup = meetups.find(item => item.gallerySlug === event);
    if (!meetup) notFound();
    return <ArtworksClient key={meetup.slug} initialArtworks={artworks} meetups={meetups} selectedEvent={meetup.slug} />;
}
