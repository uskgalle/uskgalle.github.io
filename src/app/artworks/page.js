import { getAllArtworks } from '../data/artists';
import ArtworksClient from './ArtworksClient';
import { getRecapGallery } from '../data/recap-gallery';

export const metadata = {
  title: 'Artworks - USK Galle',
  description: 'Explore sketches and artworks by the Urban Sketchers Galle community.',
};

export default function ArtworksPage() {
  const artworks = getAllArtworks();
  const meetups = getRecapGallery().meetups.filter(meetup => artworks.some(art => art.event === meetup.slug));
  return <ArtworksClient initialArtworks={artworks} meetups={meetups} />;
}
