import { notFound } from 'next/navigation';
import { getRecapGallery } from '../../data/recap-gallery';
import GalleryClient from '../GalleryClient';

// Every event gallery is generated at build time for GitHub Pages.
export const dynamicParams = false;

export function generateStaticParams() {
    return getRecapGallery().meetups.map(meetup => ({ event: meetup.gallerySlug }));
}

export async function generateMetadata({ params }) {
    const { event } = await params;
    const meetup = getRecapGallery().meetups.find(item => item.gallerySlug === event);
    if (!meetup) return {};
    return {
        title: `${meetup.title} Gallery - USK Galle`,
        description: `Browse ${meetup.count} photos from ${meetup.title} with Urban Sketchers Galle.`,
    };
}

export default async function EventGalleryPage({ params }) {
    const { event } = await params;
    const { images, meetups } = getRecapGallery();
    const meetup = meetups.find(item => item.gallerySlug === event);
    if (!meetup) notFound();

    return <GalleryClient key={meetup.slug} images={images} meetups={meetups} meetup={meetup.slug} />;
}
