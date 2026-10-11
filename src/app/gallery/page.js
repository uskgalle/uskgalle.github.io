import { getRecapGallery } from '../data/recap-gallery';
import GalleryClient from './GalleryClient';

export const metadata = {
    title: 'Gallery - USK Galle',
    description: 'Photos and memories from Urban Sketchers Galle meetups and sketch walks.',
};

export default function GalleryPage() {
    const { images, meetups } = getRecapGallery();
    return <GalleryClient images={images} meetups={meetups} />;
}
