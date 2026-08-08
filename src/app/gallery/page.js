import { getAllArtworks } from '../data/artists';
import GalleryClient from './GalleryClient';

export const metadata = {
    title: 'Gallery - USK Galle',
    description: 'Explore the urban sketches and gallery of USK Galle.',
};

export default function GalleryPage() {
    const allArtworks = getAllArtworks();

    return <GalleryClient initialArtworks={allArtworks} />;
}