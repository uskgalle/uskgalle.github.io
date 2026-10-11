import { getAllArtworks } from '../data/artists';
import ArtworksClient from './ArtworksClient';

export const metadata = {
  title: 'Artworks - USK Galle',
  description: 'Explore sketches and artworks by the Urban Sketchers Galle community.',
};

export default function ArtworksPage() {
  return <ArtworksClient initialArtworks={getAllArtworks()} />;
}
